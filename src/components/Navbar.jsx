import "./Navbar.css";

const links = [
  { label: "Home",      key: "home" },
  { label: "About Us",  key: "about" },
  { label: "Staff",     key: "staff" },
  { label: "Placement", key: "placement" },
  { label: "FAQ",       key: "faq" },
  { label: "Contact",   key: "contact" },
];

export default function Navbar({ page, setPage }) {
  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => setPage("home")}>
        🎓 Elite College
      </div>

      <ul className="navbar-links">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href="#"
              className={page === l.key ? "active" : ""}
              onClick={(e) => { e.preventDefault(); setPage(l.key); }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-auth">
        <button className="btn btn-secondary" onClick={() => setPage("login")}>Login</button>
        <button className="btn btn-primary"   onClick={() => setPage("signup")}>Sign Up</button>
      </div>
    </header>
  );
}
