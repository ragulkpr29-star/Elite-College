import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown({ setPage }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="profile-dropdown" ref={menuRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="profile-avatar">{user.fullName?.charAt(0).toUpperCase() || "S"}</span>
        <span className="profile-text">Profile</span>
      </button>

      <div className={`profile-menu ${open ? "visible" : ""}`}>
        <div className="profile-card">
          <div className="profile-card-avatar">{user.fullName?.charAt(0).toUpperCase() || "S"}</div>
          <div>
            <p className="profile-name">{user.fullName}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span>Department</span>
            <strong>{user.program || "N/A"}</strong>
          </div>
          <div className="profile-info-item">
            <span>Phone</span>
            <strong>{user.phone || "N/A"}</strong>
          </div>
        </div>

        <button type="button" className="btn btn-logout" onClick={logout}>
          Logout
        </button>
        <button
          type="button"
          className="btn btn-secondary profile-view-btn"
          onClick={() => {
            setPage("profile");
            setOpen(false);
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
