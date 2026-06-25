import { useState } from "react";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const initialForm = { email: "", password: "", remember: false };

export default function Login({ setPage }) {
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
    if (!validateEmail(form.email)) {
      setAlert({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (form.password.length < 6) {
      setAlert({ msg: "Password must be at least 6 characters.", type: "error" });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlert({ msg: data.message || "Login failed.", type: "error" });
      } else {
        login(data.user);
        setAlert({ msg: data.message || "Login successful! Redirecting…", type: "success" });
        setTimeout(() => setPage("home"), 1200);
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
        <h2>Login to Your Account</h2>
        <Alert msg={alert?.msg} type={alert?.type} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-row">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <a
              href="#"
              className="forgot-link"
              onClick={(e) => { e.preventDefault(); setPage("forgot"); }}
            >
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>

          <p className="form-link">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setPage("signup"); }}>
              Sign up here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
