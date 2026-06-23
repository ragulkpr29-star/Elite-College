const staffMembers = [
  { icon: "🧑‍💼", name: "Dr. John Smith",    role: "Principal" },
  { icon: "👩‍🔬", name: "Dr. Sarah Johnson",  role: "Head of Computer Science" },
  { icon: "👨‍🏫", name: "Prof. Michael Lee",  role: "Assistant Professor" },
  { icon: "👩‍💼", name: "Prof. Emily Davis",  role: "Placement Officer" },
  { icon: "👨‍🔬", name: "Prof. David Wilson", role: "Mathematics Department" },
  { icon: "👩‍🏫", name: "Prof. Linda Brown",  role: "Physics Department" },
];

export default function Staff() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <h1>Our Faculty &amp; Staff</h1>
        <p>Meet the experienced professionals shaping future leaders.</p>
      </section>

      {/* ── Staff Grid ── */}
      <section className="section section-white">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="grid-auto">
          {staffMembers.map((member) => (
            <div className="staff-card" key={member.name}>
              <div className="staff-avatar">{member.icon}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
