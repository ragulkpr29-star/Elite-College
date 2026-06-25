import { useState } from "react";
import Alert from "../components/Alert";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);
  const [sent,  setSent]  = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setAlert({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlert({ msg: data.message || "Something went wrong.", type: "error" });
      } else {
        setAlert({ msg: data.message || "Password reset link has been sent!", type: "success" });
        setSent(true);
        setEmail("");
      }
    } catch (err) {
      setAlert({ msg: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page" style={{ flexDirection: "column", gap: 0 }}>

      {/* ── Form card ── */}
      <div className="form-card">
        <h2>Reset Your Password</h2>
        <p className="subtitle">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <Alert msg={alert?.msg} type={alert?.type} />

        {!sent && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="resetEmail">Email Address</label>
              <input
                id="resetEmail"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Sending…" : "Send Reset Link"}
            </button>

            <p className="form-link">
              Remember your password?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setPage("login"); }}>Login here</a>
            </p>
            <p className="form-link" style={{ marginTop: 8 }}>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setPage("signup"); }}>Sign up here</a>
            </p>
          </form>
        )}
      </div>

      {/* ── Confirmation box (shown after submit) ── */}
      {sent && (
        <div className="info-box">
          <h3>📧 Password Reset</h3>
          <p>
            If an account exists with the email you provided, you will receive an email with
            instructions to reset your password. Please check your inbox and follow the link.
            The reset link will expire in 24 hours.
          </p>
          <p className="spam-note">Didn't receive an email? Check your spam folder.</p>
        </div>
      )}

    </div>
  );
}
