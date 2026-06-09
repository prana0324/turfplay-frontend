import React, { useEffect, useState, useContext } from "react";
import API from "../services/api"; // Updated path structure mapping
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext); // Use user object to safely check role parameters
  const [stats, setStats] = useState({ totalTurfs: 0, totalBookings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const tRes = await API.get("/turfs");
        const bRes = await API.get("/bookings/mybookings");
        setStats({
          totalTurfs: tRes.data ? tRes.data.length : 0,
          totalBookings: bRes.data ? bRes.data.length : 0
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5 py-5"><div className="spinner-border text-success"></div></div>;
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-7">
          <h1 className="fw-bold display-4 text-success">Premium Mobility Hub</h1>
          <p className="text-muted fs-5">
            Hello! You are currently logged in with authorization role:{" "}
            <span className="badge bg-dark px-3 py-2 text-uppercase">{user?.role || "user"}</span>
          </p>
        </div>
        <div className="col-md-5">
          <img 
            src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6" 
            className="img-fluid rounded-4 shadow-sm" 
            alt="Dashboard Vector representation"
          />
        </div>
      </div>

      <div className="row g-4 text-center">
        <div className="col-md-6">
          <div className="card border-0 shadow p-4 rounded-4 bg-primary text-white">
            <h4 className="opacity-75">Available Sports Fields</h4>
            {/* FIXED: Changed totalVehicles loop crash key to matching state totalTurfs */}
            <h1 className="display-2 fw-bold">{stats.totalTurfs}</h1>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow p-4 rounded-4 bg-success text-white">
            <h4 className="opacity-75">Your Transactions</h4>
            <h1 className="display-2 fw-bold">{stats.totalBookings}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}