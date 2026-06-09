import { Link } from "react-router-dom";

function TurfCard({ turf }) {
  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white text-dark">
      <div className="position-relative">
        <img 
          src={turf.image || "https://images.unsplash.com/photo-1529900748604-07564a03e7a6"} 
          className="card-img-top w-100 object-fit-cover" 
          style={{ height: "220px" }}
          alt={turf.name}
        />
        <span className="position-absolute top-3 end-3 badge bg-success px-3 py-1.5 rounded-pill shadow text-xs">
          Premium Turf
        </span>
      </div>
      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold text-truncate text-success fs-5 mb-1">{turf.name}</h5>
          <p className="card-text text-muted text-xs mb-3">📍 {turf.location}</p>
        </div>
        
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-xs text-uppercase text-muted fw-bold">Price Rate</span>
            <span className="fs-4 fw-bold text-success">₹{turf.pricePerHour}<span className="fs-6 text-muted fw-normal">/hr</span></span>
          </div>
          <Link to={`/turf/${turf._id}`} className="btn btn-success w-100 py-2.5 rounded-3 fw-bold text-decoration-none shadow-sm">
            Configure Slots Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TurfCard;