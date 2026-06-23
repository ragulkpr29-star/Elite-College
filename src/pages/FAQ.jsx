import { useState } from "react";

const faqs = [
  {
    q: "How can I apply for admission?",
    a: "You can apply online through our admission portal by filling the application form and uploading the required documents.",
  },
  {
    q: "Does the college provide hostel facilities?",
    a: "Yes. Separate hostel facilities are available for both boys and girls with modern amenities.",
  },
  {
    q: "What courses are offered?",
    a: "We offer Undergraduate, Postgraduate, and Professional courses across multiple disciplines.",
  },
  {
    q: "Is transportation available?",
    a: "Yes. College buses operate across multiple routes for students and staff.",
  },
  {
    q: "What is the placement percentage?",
    a: "Our college maintains an excellent placement record with over 90% placement assistance.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes. Merit-based and government scholarship schemes are available for eligible students.",
  },
  {
    q: "How can I contact the administration?",
    a: "You can contact us through the Contact page, email, or telephone during working hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions</p>
      </section>

      {/* ── FAQ List ── */}
      <section className="section section-light">
        {faqs.map((item, i) => (
          <div className="faq-box" key={i} onClick={() => toggle(i)}>
            <h3>
              {item.q}
              <span>{openIndex === i ? "▲" : "▼"}</span>
            </h3>
            {openIndex === i && <p>{item.a}</p>}
          </div>
        ))}
      </section>
    </>
  );
}
