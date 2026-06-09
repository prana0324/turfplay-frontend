import React, { useEffect, useState } from "react";
import API from "../services/api"; // Fixed file structure context referencing pipeline

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/mybookings");
      setBookings(res.data || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await API.put(`/bookings/${id}`);
        alert("Booking cancelled successfully.");
        fetchBookings(); // Auto refresh interface lists data update
      } catch (err) {
        alert("Cancellation failed");
      }
    }
  };

  if (loading) return <div className="container mt-5 text-center py-5"><div className="spinner-border text-success"></div></div>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Your Turfs Statements 🗓️</h2>

      {bookings.length === 0 ? (
        <div className="card p-5 border-0 shadow-sm text-center bg-light text-dark">
          <p className="mb-0 text-muted">No rental history discovered yet on active profile.</p>
        </div>
      ) : (
        <div className="table-responsive bg-white rounded-4 shadow p-3 text-dark">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Games</th>
                <th>Location</th>
                <th>Schedule</th>
                <th>Invoice</th>
                <th>Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                // FIXED: database schema standard status key variable property map check
                const isCancelled = b.status === "Cancelled";
                
                return (
                  <tr key={b._id}>
                    <td className="fw-bold text-success">{b.turfId?.name || "N/A"}</td>
                    <td className="text-muted">{b.turfId?.location || "N/A"}</td>
                    <td className="small font-monospace">
                      {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN') : "N/A"}
                    </td>
                    <td className="fw-bold text-dark">₹{(b.totalAmount || 0).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${isCancelled ? 'bg-danger text-white' : 'bg-success text-white'}`}>
                        {b.status || "Booked"}
                      </span>
                    </td>
                    <td>
                      {!isCancelled ? (
                        <button className="btn btn-sm btn-outline-danger px-3 rounded-pill fw-bold" onClick={() => handleCancel(b._id)}>
                          Cancel
                        </button>
                      ) : (
                        <span className="text-muted small font-monospace">Terminated</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;