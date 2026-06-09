import { useEffect, useState } from "react";
import API from "../services/api";
import TurfCard from "../components/TurfCard";

function Home() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/turfs")
      .then((res) => {
        setTurfs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-5 text-center py-5"><div className="spinner-border text-success"></div></div>;

  return (
    <div className="container mt-4 pb-5">
      <div className="p-4 p-md-5 mb-5 rounded-4 bg-success bg-opacity-10 text-center border border-success border-opacity-10">
        <h1 className="display-5 fw-bold text-success mb-2">Find & Reserve Best Local Arenas</h1>
        <p className="fs-6 text-secondary max-w-2xl mx-auto">Select open time slots, block dates instantly, support Football, Box Cricket & Premium Golf simulator categories.</p>
      </div>

      <h3 className="mb-4 fw-bold tracking-tight text-uppercase text-secondary fs-5">Available Sports Fields</h3>
      <div className="row g-4">
        {turfs.map((turf) => (
          <div className="col-md-4" key={turf._id}>
            <TurfCard turf={turf} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;