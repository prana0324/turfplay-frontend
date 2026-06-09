import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

const Register = () => {
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Anni fields fill cheyyandi!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords match avaledu!');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password కనీసం 6 characters ఉండాలి!');
      return;
    }

    try {
      const res = await API.post("/auth/register", formData);
      if(res.status === 201) {
        setSuccess(true);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className={`container-fluid d-flex justify-content-center align-items-center vh-100 ${dark ? 'bg-dark' : 'bg-light'}`}>
      <div className={`card p-4 shadow-lg border-0 rounded-4 ${dark ? 'bg-black text-white' : 'bg-white text-dark'}`} style={{ maxWidth: '440px', width: '100%' }}>
        <h2 className="text-center text-success fw-bold mb-4">Create Account 🏟️</h2>
        
        {error && <div className="alert alert-danger py-2 text-xs border-0 text-center">{error}</div>}
        {success && <div className="alert alert-success py-2 text-xs border-0 text-center">Registration Successful! 🎉 Redirecting...</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Username</label>
            <input type="text" name="username" className={`form-control ${dark ? 'bg-dark text-white border-0' : ''}`} value={formData.username} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email</label>
            <input type="email" name="email" className={`form-control ${dark ? 'bg-dark text-white border-0' : ''}`} value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" name="password" className={`form-control ${dark ? 'bg-dark text-white border-0' : ''}`} value={formData.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Confirm Password</label>
            <input type="password" name="confirmPassword" className={`form-control ${dark ? 'bg-dark text-white border-0' : ''}`} value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold py-2 rounded-3 mt-2 shadow-sm">Register</button>
        </form>
        <p className="mt-3 text-center mb-0 small">Already have an account? <Link to="/login" className="text-success fw-bold text-decoration-none">Login Here</Link></p>
      </div>
    </div>
  );
};

export default Register;