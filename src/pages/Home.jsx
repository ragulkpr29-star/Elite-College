import { useEffect } from "react";

export default function Home({ setPage }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ── Hero Section with Background Image ── */}
      <section className="hero hero-image">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">Discover Your Potential</span>
          <h1>Welcome to Elite College</h1>
          <p>
            Experience a world-class education designed to foster innovation, 
            leadership, and global perspectives. Join a community of forward-thinkers 
            and shape the future.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setPage("signup")}>Apply Now</button>
            <button className="btn btn-secondary" onClick={() => setPage("about")}>Explore Campus</button>
          </div>
        </div>
      </section>

      {/* ── About Snippet ── */}
      <section className="section section-white intro-section">
        <div className="intro-grid">
          <div className="intro-text">
            <h2 className="section-title left-align">Empowering the Leaders of Tomorrow</h2>
            <p>
              At Elite College, we believe in providing more than just a degree. We offer a transformative experience that nurtures intellectual curiosity, personal growth, and professional readiness. Our rigorous academic programs are complemented by hands-on learning, extensive research opportunities, and a vibrant campus culture.
            </p>
            <p>
              With state-of-the-art facilities, a diverse student body, and a faculty of renowned experts, we provide the perfect environment for you to discover your passions and achieve your goals.
            </p>
            <button className="btn btn-outline mt-4" onClick={() => setPage("about")}>Discover Our History</button>
          </div>
          <div className="intro-image-wrapper">
             <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop" alt="Students walking on campus" className="intro-image shadow-lg radius-lg" />
             <div className="experience-badge">
               <span className="years">25+</span>
               <span className="text">Years of<br/>Excellence</span>
             </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section section-light">
        <h2 className="section-title">Why Elite College Stands Out</h2>
        <div className="grid-auto">
          {[
            ["📚", "Expert Faculty", "Learn from industry experts and renowned professors dedicated to your academic success and mentorship."],
            ["🏆", "Global Recognition", "Our degrees are recognized worldwide, opening doors to top-tier international career opportunities."],
            ["🔬", "Advanced Facilities", "Gain hands-on experience in our cutting-edge laboratories, modern libraries, and innovation hubs."],
            ["🤝", "Vibrant Community", "Join diverse clubs, organizations, and sports teams that foster lifelong friendships and leadership skills."],
            ["💼", "Career Accelerator", "Benefit from our dedicated placement cell, internship programs, and extensive alumni network."],
            ["🌍", "Study Abroad", "Participate in exchange programs with partner universities across the globe to broaden your horizons."],
          ].map(([icon, title, desc]) => (
            <div className="card feature-card" key={title}>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Campus Gallery ── */}
      <section className="section section-white">
        <h2 className="section-title">Experience Our Campus</h2>
        <p className="section-subtitle">A glimpse into the vibrant life and state-of-the-art facilities at Elite College.</p>
        <div className="gallery-grid">
          <div className="gallery-item large">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" alt="University building" />
            <div className="gallery-overlay"><span>Main Campus</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" alt="Library" />
            <div className="gallery-overlay"><span>Central Library</span></div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="Students studying" />
            <div className="gallery-overlay"><span>Innovation Hub</span></div>
          </div>
          <div className="gallery-item wide">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" alt="Technology Lab" />
            <div className="gallery-overlay"><span>Advanced Tech Labs</span></div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section section-light testimonial-section">
        <h2 className="section-title">Student Voices</h2>
        <div className="testimonial-grid">
          {[
            {
              name: "Sarah Jenkins",
              role: "Computer Science, Class of 2025",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
              quote: "The faculty here truly care about your success. The hands-on projects and access to top-tier labs gave me the confidence to secure a software engineering internship in my sophomore year."
            },
            {
              name: "David Chen",
              role: "Business Administration, Class of 2024",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
              quote: "Elite College provided me with a global perspective. The exchange program I participated in completely changed my outlook on international business strategies."
            },
            {
              name: "Priya Patel",
              role: "Mechanical Engineering, Class of 2026",
              image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
              quote: "The vibrant campus community and the sheer number of clubs made it so easy to find my people. I've grown so much not just academically, but as a leader."
            }
          ].map((t, idx) => (
            <div className="testimonial-card" key={idx}>
              <div className="quote-icon">"</div>
              <p className="quote-text">{t.quote}</p>
              <div className="student-info">
                <img src={t.image} alt={t.name} className="student-avatar" />
                <div>
                  <h4>{t.name}</h4>
                  <span className="student-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="section section-white">
        <h2 className="section-title">Latest News & Events</h2>
        <div className="news-grid">
          {[
            {
              title: "Annual Tech Symposium 2026",
              date: "OCT 15",
              image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
              desc: "Join us for our biggest technology conference featuring keynote speakers from top tech giants."
            },
            {
              title: "New Research Grant Awarded",
              date: "SEP 28",
              image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
              desc: "Our biology department has received a $2M grant for groundbreaking renewable energy research."
            },
            {
              title: "Global Alumni Meetup",
              date: "SEP 10",
              image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
              desc: "Connect with thousands of successful Elite College alumni from around the world at this year's virtual meetup."
            }
          ].map((news, idx) => (
            <div className="news-card" key={idx}>
              <div className="news-image-wrapper">
                <img src={news.image} alt={news.title} className="news-img" />
                <div className="news-date">
                  <span className="month">{news.date.split(' ')[0]}</span>
                  <span className="day">{news.date.split(' ')[1]}</span>
                </div>
              </div>
              <div className="news-content">
                <h3>{news.title}</h3>
                <p>{news.desc}</p>
                <a href="#" className="read-more" onClick={(e) => e.preventDefault()}>Read More <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-strip">
        {[
          ["👨‍🎓", "5000+", "Active Students"],
          ["👨‍🏫", "250+",  "Expert Faculty"],
          ["🏅",  "98%",   "Placement Rate"],
          ["🌟",  "25",    "Years of Excellence"],
        ].map(([icon, num, label]) => (
          <div className="stat-item" key={label}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
            <h2>{num}</h2>
            <p>{label}</p>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="cta-band">
        <h2>Ready to Shape Your Future?</h2>
        <p>Don't wait. Enroll now and take the first step towards a successful career with Elite College.</p>
        <button className="btn btn-primary" onClick={() => setPage("signup")}>Apply for Admission</button>
      </div>
    </>
  );
}
