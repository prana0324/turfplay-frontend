import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AVAILABLE_SLOTS = [
  "06:00 AM - 07:00 AM", 
  "08:00 AM - 09:00 AM", 
  "10:00 AM - 11:00 AM",
  "02:00 PM - 03:00 PM", 
  "04:00 PM - 05:00 PM", 
  "05:00 PM - 06:00 PM",
  "07:00 PM - 08:00 PM", 
  "10:00 PM - 11:00 PM"
];

function TurfDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [turf, setTurf] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fetching, setFetching] = useState(true);
  
  // Real-time cancellation process keys
  const [activeBookingId, setActiveBookingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    API.get(`/turfs/${id}`)
      .then((res) => {
        setTurf(res.data);
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Turf details load cheyadadam lo samasya ochindi.");
        setFetching(false);
      });
  }, [id]);

  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const handleBooking = async () => {
    if (!user) {
      setErrorMessage("Please login to proceed with booking.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    if (!bookingDate || !selectedSlot) {
      setErrorMessage("Please select valid target date and time slots.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = { turfId: turf._id, bookingDate, slot: selectedSlot, totalAmount: turf.pricePerHour };
      
      const res = await API.post("/bookings", payload);
      if (res.status === 201 || res.status === 200) {
        setSuccessMessage("Turf Reservation Configured Successfully ✅ Booked !!");
        
        if (res.data?.booking?._id) {
          setActiveBookingId(res.data.booking._id);
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Slot conflict mapping error. Already booked.");
    }
  };

  const handleInstantCancel = async () => {
    if (!activeBookingId) return;
    
    const confirmCancel = window.confirm("Nijangane mee booking reservation cancel cheyalani anukuntunnara?");
    if (!confirmCancel) return;

    setActionLoading(true);
    try {
      const res = await API.put(`/bookings/${activeBookingId}`);
      if (res.status === 200) {
        setSuccessMessage("Booking Cancelled Directly From Screen Session! ✕");
        setActiveBookingId(null);
        setSelectedSlot("");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Cancellation failed link trace.");
    } finally {
      setActionLoading(false);
    }
  };

  if (fetching) return <div className="container mt-5 text-center py-5"><div className="spinner-border text-success"></div></div>;

  return (
    <div className="container mt-5 pb-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <img src={turf?.image || "https://images.unsplash.com/photo-1529900748604-07564a03e7a6"} className="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" style={{ maxHeight: '420px', minHeight: '320px' }} alt={turf?.name} />
          <h2 className="fw-bold mt-4 mb-1 text-success">{turf?.name}</h2>
          <p className="text-muted">📍 {turf?.location}</p>
          <p className="text-secondary small">{turf?.description}</p>
        </div>
        
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm border-0 rounded-4 bg-white text-dark">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold text-uppercase tracking-wide mb-0">Configure Schedule</h5>
              <span className="fs-3 fw-bold text-success">₹{turf?.pricePerHour}<span className="fs-6 text-muted fw-normal">/hr</span></span>
            </div>
            
            {errorMessage && <div className="alert alert-danger py-2 rounded-3 text-xs border-0 text-center mb-3">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success py-2 rounded-3 text-xs border-0 text-center mb-3">{successMessage}</div>}

            <div className="mb-4">
              <label className="form-label text-xs fw-bold text-uppercase text-muted">Choose Target Date</label>
              <input type="date" className="form-control" disabled={activeBookingId !== null} value={bookingDate} min={getTodayDateString()} onChange={(e) => setBookingDate(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="form-label text-xs fw-bold text-uppercase text-muted">Available 1-Hour Time Blocks</label>
              <div className="row g-2">
                {AVAILABLE_SLOTS.map((slot) => (
                  <div className="col-6" key={slot}>
                    <button 
                      type="button" 
                      disabled={activeBookingId !== null} 
                      onClick={() => setSelectedSlot(slot)} 
                      className={`btn btn-sm w-100 py-2 border ${selectedSlot === slot ? 'btn-success text-white' : 'btn-outline-secondary'}`}
                    >
                      {slot}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {!activeBookingId ? (
              <button type="button" className="btn btn-success w-100 fw-bold py-3 rounded-3 shadow-sm text-uppercase" onClick={handleBooking}>
                Confirm and Pay Amount
              </button>
            ) : (
              <div className="mt-2 border border-danger border-opacity-25 bg-danger bg-opacity-10 p-3 rounded-3 text-center">
                <p className="small text-danger fw-bold mb-2">Need to adjust timings? Change reservation below:</p>
                <button type="button" disabled={actionLoading} className="btn btn-danger w-100 fw-bold py-2.5 rounded-3 text-uppercase" onClick={handleInstantCancel}>
                  {actionLoading ? "Processing Cancel Request..." : "✕ Cancel Active Booking"}
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurfDetails;