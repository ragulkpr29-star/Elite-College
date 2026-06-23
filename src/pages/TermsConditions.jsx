export default function TermsConditions() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Terms &amp; Conditions</h1>
        <p>Please Read Carefully</p>
      </section>

      {/* ── Content ── */}
      <section className="section section-white">
        <div className="policy-body">
          <p className="italic-note"><strong>Last Updated:</strong> January 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Elite College website and services, you accept and agree to be
            bound by the terms and provision of this agreement. If you do not agree, please do not use
            this service.
          </p>

          <h2>2. Use License</h2>
          <p>
            Elite College grants you a limited, non-exclusive, non-transferable license to access and
            use the Site for lawful purposes only. You agree not to:
          </p>
          <ul>
            {[
              "Reproduce or duplicate any content from this Site without permission",
              "Modify, translate, or create derivative works from any materials",
              "Sell, transfer, or assign any rights to materials on this Site",
              "Remove any copyright or proprietary notices from the materials",
              "Use automated tools or bots to access the Site",
              "Attempt to gain unauthorized access to the Site or any systems",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>3. User Accounts</h2>
          <p>If you create an account on the Site, you agree to:</p>
          <ul>
            {[
              "Provide accurate, current, and complete information",
              "Maintain the confidentiality of your password and account information",
              "Accept full responsibility for all activities that occur under your account",
              "Notify Elite College immediately of any unauthorized use of your account",
              "Not share your account credentials with other individuals",
            ].map((item) => <li key={item}>{item}</li>)}
          </ul>

          <h2>4. Admission and Enrollment</h2>
          <p>
            Elite College reserves the right to modify, suspend, or cancel any program or course;
            change admission criteria; adjust fees with reasonable notice; reject any application at
            its discretion; and withdraw admission if false information is discovered.
          </p>

          <h2>5. Fees and Payments</h2>
          <p>
            Students agree to pay all fees as per the fee structure determined by Elite College. The
            college reserves the right to revise fees with 30 days' notice, withhold academic records
            until fees are paid, and cancel enrollment for non-payment.
          </p>

          <h2>6. Academic Conduct and Discipline</h2>
          <p>
            All students are expected to maintain high standards of academic and personal integrity,
            abide by the Code of Conduct, refrain from plagiarism and cheating, and respect the rights
            and dignity of all community members. Violations may result in suspension or expulsion.
          </p>

          <h2>7. Intellectual Property Rights</h2>
          <p>
            All content on the Site, including text, graphics, logos, images, and software, is the
            property of Elite College and is protected by international copyright laws. Unauthorized
            use is prohibited.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Elite College shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including loss of profits or data.
          </p>

          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Site and all content are provided on an "as-is" and "as-available" basis. Elite College
            disclaims all warranties, express or implied, including merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>

          <h2>10. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. Elite College is not responsible for
            the content or practices of external websites. Your access to third-party sites is at your
            own risk.
          </p>

          <h2>11. Modification of Terms</h2>
          <p>
            Elite College reserves the right to modify these Terms at any time. Changes will be
            effective immediately upon posting. Continued use of the Site constitutes acceptance of
            updated terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of the jurisdiction where Elite College
            is located. You agree to submit to the exclusive jurisdiction of the courts in that
            jurisdiction.
          </p>

          <h2>13. Contact Information</h2>
          <div className="policy-contact-box">
            <p><strong>Elite College</strong></p>
            <p>📍 123 Education Street, University City, UC 12345</p>
            <p>📞 1-800-COLLEGE</p>
            <p>✉️ legal@elitecollege.edu</p>
            <p>🌐 www.elitecollege.edu</p>
          </div>
          <p style={{ fontSize: 14, color: "#666" }}>
            We will respond to your inquiries within 30 days of receipt.
          </p>

          <div className="notice-box">
            <p style={{ fontWeight: 700 }}>⚠️ Important Notice</p>
            <p style={{ marginTop: 8 }}>
              By continuing to use this Site, you acknowledge that you have read, understood, and agree
              to be bound by all the terms and conditions mentioned above. If you disagree with any
              part of these terms, you must discontinue your use of the Site immediately.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
