import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile({ setPage }) {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setPage("login");
    }
  }, [isAuthenticated, setPage]);

  if (!user) {
    return null;
  }

  return (
    <div className="form-page profile-page">
      <div className="form-card profile-page-card">
        <div className="profile-hero">
          <div className="profile-avatar-large">{user.fullName?.charAt(0).toUpperCase() || "S"}</div>
          <div>
            <p className="subtitle">Student profile overview</p>
            <h2>{user.fullName}</h2>
            <p className="profile-role">{user.program || "No Program Assigned"}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail-card">
            <span>Student Name</span>
            <strong>{user.fullName}</strong>
          </div>
          <div className="profile-detail-card">
            <span>Email Address</span>
            <strong>{user.email}</strong>
          </div>
          <div className="profile-detail-card">
            <span>Department / Program</span>
            <strong>{user.program || "N/A"}</strong>
          </div>
          <div className="profile-detail-card">
            <span>Phone Number</span>
            <strong>{user.phone || "N/A"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
