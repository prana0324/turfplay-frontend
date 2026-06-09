// import { useEffect, useState } from "react";
// import API from "../services/api";

// function BookingHistory() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);

//   // Database nunchi records stream fetch cheyadaaniki logic
//   const fetchUserHistoryRecords = () => {
//     API.get("/bookings/mybookings")
//       .then((res) => {
//         setBookings(res.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch Error:", err);
//         setError("Mee bookings record data load cheyadam lo error ochindi.");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchUserHistoryRecords();
//   }, []);

//   // 🚨 CRITICAL FEATURE: Cancel Booking Integration Pipeline Call
//   const handleCancelAction = async (bookingId) => {
//     const confirmation = window.confirm("Mee slots reservation pipeline ni confirm ga Cancel cheyalani anukuntunnara?");
//     if (!confirmation) return;

//     setActionLoading(true);
//     try {
//       // Backend routing link `/api/bookings/:id` dynamic parameter payload point mapping update
//       const res = await API.put(`/bookings/${bookingId}`);
//       if (res.status === 200) {
//         alert("Booking Cancelled Successfully! 🎉");
//         fetchUserHistoryRecords(); // Front-end real-time interface auto refresh
//       }
//     } catch (err) {
//       console.error("Cancellation Error:", err);
//       alert(err.response?.data?.message || "Cancellation execution pipeline layer update matrix error.");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center py-5">
//         <div className="spinner-border text-success" role="status"></div>
//         <p className="mt-2 text-muted">Mee booking history retrieve avthundhi, readying grids...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4 pb-5">
//       <h2 className="fw-bold mb-1">Reservations History 🗓️</h2>
//       <p className="text-muted small mb-4">Track all configured stadium hours receipt parameters and slot statuses.</p>

//       {error && <div className="alert alert-danger text-center max-width-md mx-auto mb-4">{error}</div>}

//       {bookings.length === 0 ? (
//         <div className="alert alert-secondary text-center p-5 rounded-4 border-0">
//           No match reservation logs detected on your active profile.
//         </div>
//       ) : (
//         <div className="row g-4">
//           {bookings.map((b) => {
//             const isCancelled = b.status === "Cancelled";
//             return (
//               <div key={b._id || Math.random().toString()} className="col-md-6">
                
//                 {/* Dynamic Status Left Border Mapping Implementation */}
//                 <div className={`card h-100 shadow-sm border-0 border-start border-4 ${
//                   isCancelled ? "border-danger" : "border-success"
//                 } p-4 bg-white text-dark`}>
                  
//                   <div className="d-flex justify-content-between align-items-start mb-2">
//                     <div>
//                       <h5 className={`fw-bold mb-0 ${isCancelled ? "text-danger" : "text-success"}`}>
//                         {b.turfId?.name || "Premium Arena"}
//                       </h5>
//                       <small className="text-muted d-block mt-1">📍 {b.turfId?.location || "Hyderabad Ground"}</small>
//                     </div>
//                     {/* Status Display Badge Indicator */}
//                     <span className={`badge px-3 py-2 text-uppercase font-monospace text-xs border-0 ${
//                       isCancelled ? "bg-danger text-white" : "bg-success text-white"
//                     }`}>
//                       {b.status || "Booked"}
//                     </span>
//                   </div>

//                   {/* Core Matrix Meta Detail Card Section Data Content View */}
//                   <div className="bg-light p-3 rounded-3 mt-3 text-sm border border-secondary border-opacity-10">
//                     <div className="mb-1">
//                       <strong>📅 Scheduled Date:</strong> 
//                       <span className="ms-2 font-monospace">{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN') : "N/A"}</span>
//                     </div>
//                     <div className="mb-1">
//                       <strong>⏰ Allocated Slot:</strong> 
//                       <span className="ms-2 font-monospace">{b.slot || "N/A"}</span>
//                     </div>
//                     <div className={`${isCancelled ? "text-danger" : "text-success"} fw-bold mt-2 pt-2 border-top fs-6`}>
//                       <strong>💰 Due Total:</strong> ₹{(b.totalAmount || 0).toLocaleString('en-IN')}
//                     </div>
//                   </div>

//                   {/* Dynamic Action Trigger View Block Controls */}
//                   {!isCancelled && (
//                     <div className="mt-3 text-end">
//                       <button
//                         type="button"
//                         disabled={actionLoading}
//                         onClick={() => handleCancelAction(b._id)}
//                         className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-3 fw-bold shadow-none"
//                       >
//                         {actionLoading ? "Processing..." : "✕ Cancel Booking"}
//                       </button>
//                     </div>
//                   )}

//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookingHistory;