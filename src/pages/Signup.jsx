import { useState } from "react";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const initialForm = {
  fullName: "", email: "", password: "", confirmPassword: "",
  phone: "", program: "", terms: false,
};

export default function Signup({ setPage }) {
  const [form, setForm] = useState(initialForm);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.fullName.trim().length < 3) {
      setAlert({ msg: "Full name must be at least 3 characters.", type: "error" });
      return;
    }
    if (!validateEmail(form.email)) {
      setAlert({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (form.password.length < 6) {
      setAlert({ msg: "Password must be at least 6 characters.", type: "error" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setAlert({ msg: "Passwords do not match.", type: "error" });
      return;
    }
    if (!form.terms) {
      setAlert({ msg: "Please accept the Terms & Conditions.", type: "error" });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.phone,
          program: form.program,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlert({ msg: data.message || "Signup failed.", type: "error" });
      } else {
        login(data.user);
        setAlert({ msg: data.message || "Account created successfully!", type: "success" });
        setTimeout(() => setPage("profile"), 1200);
      }
    } catch (err) {
      setAlert({ msg: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Create Your Account</h2>
        <Alert msg={alert?.msg} type={alert?.type} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName" name="fullName" type="text"
              placeholder="Enter your full name"
              value={form.fullName} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signupEmail">Email Address</label>
            <input
              id="signupEmail" name="email" type="email"
              placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword" name="password" type="password"
              placeholder="Enter a strong password"
              value={form.password} onChange={handleChange} required
            />
            <small>Minimum 6 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword" name="confirmPassword" type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone" name="phone" type="tel"
              placeholder="Enter your phone number"
              value={form.phone} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="program">Program (Optional)</label>
            <select id="program" name="program" value={form.program} onChange={handleChange}>
              <option value="">Select a program</option>
              <option value="btech">B.Tech</option>
              <option value="bsc">B.Sc</option>
              <option value="bcom">B.Com</option>
              <option value="ba">B.A.</option>
              <option value="mba">MBA</option>
              <option value="mtech">M.Tech</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox" id="terms" name="terms"
              checked={form.terms} onChange={handleChange} required
            />
            <span>
              I agree to the{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Terms &amp; Conditions</a>
              {" "}and{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a>
            </span>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating Account…" : "Create Account"}
          </button>

          <p className="form-link">
            Already have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage("login"); }}>
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
