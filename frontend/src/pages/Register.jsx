import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8001/signup', formData);
      setSuccess('Account created successfully!');
      setError('');
      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #c3f5ff, #dee5ff)',
        padding: '2rem',
      }}
    >
      <div className="card shadow-lg rounded-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-4 text-dark">Create Account</h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="form-control rounded-pill"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control rounded-pill"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control rounded-pill"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success rounded-pill fw-semibold">
                Register
              </button>
            </div>
          </form>

          <p className="text-center text-muted mt-4 mb-0">
            Already have an account?{' '}
            <a href="/" className="text-decoration-none fw-semibold text-success">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
