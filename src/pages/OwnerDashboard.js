//  import { useEffect, useState, useContext, useMemo } from "react";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// function OwnerDashboard() {
//   const { user } = useContext(AuthContext);
//   const [allBookings, setAllBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // Declare aindi

//   useEffect(() => {
//     API.get("/bookings/all-bookings")
//       .then((res) => {
//         setAllBookings(res.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Dashboard Fetch Error:", err);
//         setError("System records load cheyadam lo error ochindi."); // Set chesam
//         setLoading(false);
//       });
//   }, []);

//   const { activeCount, revenue } = useMemo(() => {
//     const active = allBookings.filter((b) => b.status !== "Cancelled");
//     return {
//       activeCount: active.length,
//       revenue: active.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0)
//     };
//   }, [allBookings]);

//   if (loading) return <div className="container mt-5 text-center py-5"><div className="spinner-border text-success"></div></div>;

//   // 🚨 FIXED: 'error' state variable ni ikkada dynamic rendering ui template validation code alert loops handle chesam
//   if (error) {
//     return (
//       <div className="container mt-5 text-center text-danger py-5">
//         <div className="alert alert-danger max-width-md mx-auto">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4 pb-5">
//       <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
//         <div>
//           <h2 className="fw-bold mb-1">Owner Dashboard </h2>
//           <p className="text-muted small mb-0">Manage systems, check scheduling matrices, and trace metrics.</p>
//         </div>
//         <span className="badge bg-danger bg-opacity-10 text-danger border border-danger p-2 text-uppercase font-monospace text-xs fw-bold">
//           Role: {user?.role || "Manager"} Control Active
//         </span>
//       </div>

//       <div className="row g-4 mb-5">
//         <div className="col-md-4"><div className="card shadow-sm border-0 p-4 bg-white text-dark"><small className="text-muted fw-bold text-xs text-uppercase">Total Allocated Slots</small><h3 className="fw-bold text-success mt-2 mb-0">{allBookings.length} Bookings</h3></div></div>
//         <div className="col-md-4"><div className="card shadow-sm border-0 p-4 bg-white text-dark"><small className="text-muted fw-bold text-xs text-uppercase">Active Ground Blocks</small><h3 className="fw-bold text-primary mt-2 mb-0">{activeCount} Sessions</h3></div></div>
//         <div className="col-md-4"><div className="card shadow-sm border-0 p-4 bg-white text-dark"><small className="text-muted fw-bold text-xs text-uppercase">Gross Income Accrued</small><h3 className="fw-bold text-warning mt-2 mb-0">₹{revenue.toLocaleString('en-IN')}</h3></div></div>
//       </div>

//       <div className="card shadow-sm border-0 rounded-3 p-4 bg-white text-dark">
//         <h5 className="fw-bold mb-4 text-uppercase tracking-wide fs-6">System Bookings Master Audit Records</h5>
//         <div className="table-responsive">
//           <table className="table table-hover align-middle mb-0 text-sm">
//             <thead className="table-light text-uppercase text-xs">
//               <tr><th>Sports Fields</th><th>Booking Date</th><th>Slot Timings</th><th>Bill Total</th><th>Status Matrix</th></tr>
//             </thead>
//             <tbody>
//               {allBookings.map((b) => (
//                 <tr key={b._id || Math.random().toString()} className="text-secondary">
//                   <td className="fw-bold text-dark">{b.turfId?.name || "Premium Stadium"}</td>
//                   <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString('en-IN') : "N/A"}</td>
//                   <td>{b.slot || "N/A"}</td>
//                   <td className="text-success fw-bold">₹{(b.totalAmount || 0).toLocaleString('en-IN')}</td>
//                   <td><span className={`badge ${b.status === "Cancelled" ? "bg-danger" : "bg-success"}`}>{b.status || "Booked"}</span></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OwnerDashboard;