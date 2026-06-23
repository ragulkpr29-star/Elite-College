export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>About Elite College</h1>
        <p>Empowering Students Since 1999</p>
      </section>

      {/* ── Who We Are ── */}
      <section className="section section-white">
        <h2 className="section-title" style={{ textAlign: "left" }}>Who We Are</h2>
        <div className="about-text">
          <p>
            Elite College is one of the leading institutions dedicated to providing quality education,
            innovation, and career-oriented learning experiences. Established in 1999, our college has
            consistently produced skilled graduates who excel in academics, technology, research,
            entrepreneurship, and leadership. We believe in nurturing students with strong values,
            critical thinking abilities, and practical knowledge that prepares them for real-world challenges.
          </p>
          <p>
            Our campus offers modern classrooms, advanced laboratories, digital libraries, placement
            training, sports facilities, and student support services to ensure holistic development.
            We strive to create an inclusive and inspiring environment where students can learn, innovate,
            and achieve their goals.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section section-light">
        <div className="mv-grid">
          <div className="card">
            <h3>🎯 Our Mission</h3>
            <p>
              To provide quality education, encourage innovation, develop leadership skills, and prepare
              students to become responsible professionals and lifelong learners.
            </p>
          </div>
          <div className="card">
            <h3>🚀 Our Vision</h3>
            <p>
              To become a globally recognized institution that inspires excellence in education, research,
              technology, and social responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-strip">
        {[
          ["10,000+", "Students"],
          ["500+",    "Faculty Members"],
          ["100+",    "Programs Offered"],
          ["95%",     "Placement Rate"],
        ].map(([num, label]) => (
          <div className="stat-item" key={label}>
            <h2>{num}</h2>
            <p>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Facilities ── */}
      <section className="section section-white">
        <h2 className="section-title">Campus Facilities</h2>
        <div className="grid-auto">
          {[
            ["📚", "Digital Library",   "Access thousands of books, journals, and research papers."],
            ["💻", "Computer Labs",     "Modern systems with latest software and internet connectivity."],
            ["🏀", "Sports Complex",    "Indoor and outdoor facilities for sports and fitness."],
            ["🏢", "Smart Classrooms",  "Technology-enabled classrooms for interactive learning."],
            ["🍴", "Cafeteria",         "Healthy and hygienic food for students and staff."],
            ["🎯", "Placement Cell",    "Career guidance, internships, and recruitment support."],
          ].map(([icon, title, desc]) => (
            <div className="facility-card" key={title}>
              <h3>{icon} {title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Achievements ── */}
      <section className="section section-light">
        <h2 className="section-title">Our Achievements</h2>
        <ul className="achievements-list">
          {[
            "🏆 Ranked among the top educational institutions in the region.",
            "🏆 95% student placement record in leading companies.",
            "🏆 Strong industry collaborations and internship programs.",
            "🏆 State-level and national-level academic awards.",
            "🏆 Successful alumni working across the globe.",
            "🏆 Excellence in research, innovation, and entrepreneurship.",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
