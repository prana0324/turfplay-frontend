import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data && res.data.token) {
        login({ user: res.data.user, token: res.data.token });
        navigate("/explore"); // Redirect direct to Home fields search layout
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials connection parameter failure.");
    }
  };

  return (
    <div className={`container-fluid d-flex justify-content-center align-items-center vh-100 ${dark ? 'bg-dark' : 'bg-light'}`}>
      <div className={`card p-4 shadow-lg border-0 rounded-4 ${dark ? 'bg-black text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center text-success fw-bold mb-4">🏟️ TURFPLAY Login</h2>
        
        {error && <div className="alert alert-danger text-center py-2 text-xs border-0">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small">Email Address</label>
            <input type="email" className={`form-control ${dark ? 'bg-dark text-white border-0 p-2.5' : 'p-2.5'}`} required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold small">Password</label>
            <input type="password" className={`form-control ${dark ? 'bg-dark text-white border-0 p-2.5' : 'p-2.5'}`} required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold py-2.5 rounded-3 shadow mt-3">Sign In</button>
        </form>
        <p className="mt-3 text-center mb-0 small">New user? <Link to="/register" className="text-success fw-bold text-decoration-none">Create Account</Link></p>
      </div>
    </div>
  );
}