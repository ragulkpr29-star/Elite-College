import { useState } from "react";
import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home",      key: "home" },
  { label: "About Us",  key: "about" },
  { label: "Staff",     key: "staff" },
  { label: "Placement", key: "placement" },
  { label: "FAQ",       key: "faq" },
  { label: "Contact",   key: "contact" },
];

export default function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo" onClick={() => setPage("home")}>🎓 Elite College</div>
        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link.key}
            href="#"
            className={page === link.key ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setPage(link.key);
              setMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar-auth">
        {isAuthenticated ? (
          <ProfileDropdown setPage={setPage} />
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => setPage("login")}>Login</button>
            <button className="btn btn-primary" onClick={() => setPage("signup")}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}
