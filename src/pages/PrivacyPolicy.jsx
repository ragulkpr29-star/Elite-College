export default function PrivacyPolicy() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Privacy Policy</h1>
        <p>Your Privacy is Important to Us</p>
      </section>

      {/* ── Content ── */}
      <section className="section section-white">
        <div className="policy-body">
          <p className="italic-note"><strong>Last Updated:</strong> January 2024</p>

          <h2>1. Introduction</h2>
          <p>
            Elite College ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our
            website and use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            {[
              "Name, email address, postal address, and telephone number",
              "Date of birth, gender, and citizenship",
              "Educational background and academic records",
              "Admission and enrollment information",
              "Payment and financial information",
              "Login credentials and password information",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h3>2.2 Automatic Information</h3>
          <ul>
            {[
              "Log data (IP address, browser type, pages visited)",
              "Device information (device type, operating system)",
              "Cookies and similar tracking technologies",
              "Website usage patterns and preferences",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            {[
              "Processing and managing your application and admission",
              "Providing educational services and academic support",
              "Communicating with you regarding your account and updates",
              "Processing payments and managing billing",
              "Conducting surveys and research to improve our services",
              "Preventing fraud and enhancing security",
              "Complying with legal obligations and regulations",
              "Marketing and promotional communications (with your consent)",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>4. Data Security</h2>
          <p>
            Elite College implements comprehensive security measures to protect your personal information
            including SSL/TLS encryption for data transmission, secure servers and firewalls, regular
            security audits, access controls, and employee training on data protection.
          </p>

          <h2>5. Your Privacy Rights</h2>
          <ul>
            {[
              "Right to Access: You can request access to the personal information we hold about you.",
              "Right to Correction: You can request that we correct any inaccurate or incomplete information.",
              "Right to Deletion: You can request deletion of your personal information (subject to legal requirements).",
              "Right to Data Portability: You can request your information in a structured, commonly-used format.",
              "Right to Opt-Out: You can opt out of marketing communications at any time.",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to remember your preferences, understand how
            you use the Site, improve functionality, and deliver personalised content. You can control
            cookies through your browser settings.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. Elite College is not responsible for
            the privacy practices or content of external websites.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            The Site is not intended for individuals under the age of 18. We do not knowingly collect
            personal information from children under 18 years old.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            Elite College reserves the right to modify this Privacy Policy at any time. Changes will be
            effective immediately upon posting to the Site.
          </p>

          <h2>10. Contact Us</h2>
          <div className="policy-contact-box">
            <p><strong>Elite College</strong></p>
            <p>📍 123 Education Street, University City, UC 12345</p>
            <p>📞 1-800-COLLEGE</p>
            <p>✉️ privacy@elitecollege.edu</p>
            <p>🌐 www.elitecollege.edu</p>
          </div>
          <p style={{ fontSize: 14, color: "#666" }}>
            We will respond to your inquiries within 30 days of receipt.
          </p>
        </div>
      </section>
    </>
  );
}
