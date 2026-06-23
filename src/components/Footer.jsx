import "./Footer.css";

export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-brand">
            <h2 className="footer-logo">🎓 Elite College</h2>
            <p className="footer-desc">
              Empowering students with world-class education and modern facilities to shape the leaders of tomorrow.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
              <a href="#" aria-label="Instagram">📸</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              {["home", "about", "staff", "placement"].map((key) => {
                const labels = { home: "Home", about: "About Us", staff: "Our Faculty", placement: "Placements" };
                return (
                  <li key={key}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage(key); }}>
                      {labels[key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="footer-links">
            <h3>Support & Legal</h3>
            <ul>
              {["faq", "contact", "privacy", "terms"].map((key) => {
                const labels = { faq: "FAQ", contact: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service" };
                return (
                  <li key={key}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage(key); }}>
                      {labels[key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <ul className="contact-info">
              <li><span>📍</span> 123 Education Street, Knowledge City, TN 638052</li>
              <li><span>📞</span> +91 9876543210</li>
              <li><span>✉️</span> info@elitecollege.edu</li>
            </ul>
            <div className="newsletter">
              <h4>Subscribe to our Newsletter</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn-subscribe">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Elite College. All Rights Reserved.</p>
          <p className="footer-credit">Designed with <span className="heart">❤️</span> for Education</p>
        </div>
      </div>
    </footer>
  );
}
