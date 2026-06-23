import { useState } from "react";
import Alert from "../components/Alert";

const initialForm = { name: "", email: "", subject: "", message: "" };

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [form,  setForm]  = useState(initialForm);
  const [alert, setAlert] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setAlert({ msg: "Please enter a valid email address.", type: "error" });
      return;
    }
    setAlert({ msg: "Message sent! We'll get back to you soon.", type: "success" });
    setForm(initialForm);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you</p>
      </section>

      {/* ── Contact Grid ── */}
      <section className="section section-light">
        <div className="contact-grid">

          {/* Info */}
          <div className="contact-info-card">
            <h3>College Contact Information</h3>
            <p>
              <strong>📍 Address:</strong><br />
              Elite College, 123 Education Street,<br />
              Knowledge City, Tamil Nadu - 638052
            </p>
            <p><strong>📞 Phone:</strong><br />+91 9876543210</p>
            <p><strong>📧 Email:</strong><br />info@elitecollege.edu</p>
            <p>
              <strong>🕒 Office Hours:</strong><br />
              Monday – Friday: 9 AM – 5 PM<br />
              Saturday: 9 AM – 1 PM
            </p>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <Alert msg={alert?.msg} type={alert?.type} />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}
