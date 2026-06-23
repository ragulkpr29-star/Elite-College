const highlights = [
  { num: "95%",      label: "Placement Rate" },
  { num: "₹12 LPA", label: "Highest Package" },
  { num: "₹4.5 LPA",label: "Average Package" },
  { num: "500+",     label: "Internships" },
];

const recruiters = ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCL", "Zoho", "Tech Mahindra"];

const trainingPrograms = [
  "Aptitude Training",
  "Soft Skills Development",
  "Communication Skills",
  "Mock Interviews",
  "Resume Building Workshops",
  "Industry Expert Sessions",
  "Coding Challenges & Hackathons",
  "Internship Assistance",
];

export default function Placement() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Training &amp; Placement Cell</h1>
        <p>Bridging Students and Industry Opportunities</p>
      </section>

      {/* ── Highlights ── */}
      <section className="section section-white">
        <h2 className="section-title">Placement Highlights</h2>
        <div className="grid-auto">
          {highlights.map(({ num, label }) => (
            <div className="card" key={label}>
              <h2 style={{ color: "var(--primary)", fontSize: 40 }}>{num}</h2>
              <p>{label}</p>
            </div>
          ))}
        </div>

        {/* ── Recruiters ── */}
        <h2 className="section-title" style={{ marginTop: 56 }}>Top Recruiters</h2>
        <div className="grid-auto">
          {recruiters.map((company) => (
            <div className="company-chip" key={company}>{company}</div>
          ))}
        </div>

        {/* ── Training ── */}
        <div className="training-box">
          <h2>Training Programs</h2>
          <ul>
            {trainingPrograms.map((program) => (
              <li key={program}>{program}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
