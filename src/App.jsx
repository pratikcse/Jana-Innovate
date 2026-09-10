import { useState } from "react";

const challenges = [
  {
    title: "Unreliable irrigation for small farmers",
    category: "Agriculture",
    district: "Ranchi",
    priority: "High",
    match: "94%",
    affected: "420",
    description:
      "Farmers in rural areas face difficulties accessing reliable irrigation during dry periods."
  },
  {
    title: "Water quality monitoring in villages",
    category: "Water",
    district: "Hazaribagh",
    priority: "High",
    match: "91%",
    affected: "1,200",
    description:
      "Communities need an affordable way to monitor drinking water quality regularly."
  },
  {
    title: "Limited access to rural health information",
    category: "Healthcare",
    district: "Dumka",
    priority: "Medium",
    match: "87%",
    affected: "800",
    description:
      "Residents struggle to access reliable information about nearby health services."
  },
  {
    title: "Digital learning access in remote schools",
    category: "Education",
    district: "Giridih",
    priority: "Medium",
    match: "89%",
    affected: "650",
    description:
      "Remote schools need affordable digital learning infrastructure."
  }
];

function App() {
  const [page, setPage] = useState("home");
  const [submitted, setSubmitted] = useState(null);
  const [toast, setToast] = useState("");

  const navigate = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get("title") || "Community Challenge",
      description:
        form.get("description") ||
        "A community challenge submitted through JANA INNOVATE.",
      district: form.get("district") || "Ranchi",
      location: form.get("location") || ""
    };
    setSubmitted(data);
    notify("Challenge submitted successfully. JAN AI analysis complete.");
    navigate("analysis");
  };

  return (
    <div className="app">
      <Header page={page} navigate={navigate} />

      {page === "home" && <Home navigate={navigate} />}
      {page === "report" && <Report onSubmit={handleSubmit} navigate={navigate} />}
      {page === "analysis" && (
        <Analysis
          data={submitted}
          navigate={navigate}
        />
      )}
      {page === "challenges" && (
        <Challenges navigate={navigate} />
      )}
      {page === "dashboard" && (
        <Dashboard navigate={navigate} />
      )}
      {page === "project" && (
        <Project navigate={navigate} />
      )}
      {page === "impact" && <Impact navigate={navigate} />}

      <Footer navigate={navigate} />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Header({ page, navigate }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={() => navigate("home")}>
        <span className="brand-mark">JI</span>
        <span>
          <strong>JANA INNOVATE</strong>
          <small>Civic Innovation Platform</small>
        </span>
      </button>

      <nav>
        {[
          ["home", "Home"],
          ["challenges", "Challenges"],
          ["project", "Projects"],
          ["impact", "Impact"]
        ].map(([id, label]) => (
          <button
            key={id}
            className={page === id ? "nav-link active" : "nav-link"}
            onClick={() => navigate(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button className="btn primary small" onClick={() => navigate("report")}>
        + Report a Challenge
      </button>
    </header>
  );
}

function Home({ navigate }) {
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-copy">
          <div className="eyebrow">🇮🇳 INNOVATION FOR COMMUNITIES</div>
          <h1>
            Turning Local Problems
            <span> Into Real Solutions.</span>
          </h1>
          <p>
            JANA INNOVATE connects citizens, universities, government,
            startups and industry to solve real societal challenges across
            communities.
          </p>

          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate("report")}>
              Report a Challenge →
            </button>
            <button className="btn secondary" onClick={() => navigate("challenges")}>
              Explore Challenges
            </button>
          </div>

          <div className="trust-row">
            <Stat value="1,248+" label="Challenges Reported" />
            <Stat value="86" label="University Teams" />
            <Stat value="42" label="Industry Partners" />
          </div>
        </div>

        <div className="network-card">
          <div className="network-head">
            <span>LIVE INNOVATION NETWORK</span>
            <b>● LIVE</b>
          </div>

          <div className="network">
            <Node icon="👥" title="Citizens" text="Report problems" />
            <div className="line" />
            <Node icon="✦" title="JAN AI" text="Analyze & match" ai />
            <div className="line" />
            <Node icon="🎓" title="Universities" text="Build solutions" />
            <div className="line" />
            <Node icon="🏢" title="Industry" text="Fund & scale" />
          </div>

          <div className="network-foot">
            <span>● 24 active collaborations</span>
            <span>● 8 districts connected</span>
          </div>
        </div>
      </section>

      <section className="section page-shell">
        <div className="section-heading">
          <div>
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>One platform. <span>Everyone working together.</span></h2>
          </div>
          <p>
            From identifying a problem to measuring its impact, JANA INNOVATE
            brings the complete innovation lifecycle into one transparent platform.
          </p>
        </div>

        <div className="steps">
          <Step n="01" icon="📍" title="Citizen Reports"
            text="Citizens submit local challenges with location, photos and supporting information." />
          <Step n="02" icon="✦" title="AI Analysis"
            text="Challenges are categorized, prioritized and matched with relevant expertise." />
          <Step n="03" icon="🎓" title="University Solution"
            text="Students, researchers and mentors form teams to develop practical solutions." />
          <Step n="04" icon="🚀" title="Industry Scales"
            text="Industry provides technology, mentorship, funding and implementation support." />
        </div>
      </section>

      <section className="section page-shell soft">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PLATFORM OVERVIEW</div>
            <h2>See what's happening across communities.</h2>
          </div>
          <button className="text-btn" onClick={() => navigate("dashboard")}>
            Open Dashboard →
          </button>
        </div>

        <div className="stats-grid">
          <StatCard icon="📋" value="1,248" title="Challenges submitted" note="↑ 18% this month" />
          <StatCard icon="🎓" value="86" title="University teams" note="↑ 12 new teams" />
          <StatCard icon="🏢" value="42" title="Industry partners" note="↑ 7 partnerships" />
          <StatCard icon="🌱" value="73" title="Projects creating impact" note="↑ 21% this quarter" />
        </div>
      </section>
    </>
  );
}

function Report({ onSubmit, navigate }) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <section className="page-shell inner">
      <button className="back" onClick={() => navigate("home")}>← Back to Home</button>

      <div className="page-title">
        <div className="eyebrow">CITIZEN PARTICIPATION</div>
        <h1>Report a Challenge</h1>
        <p>
          Tell us about a problem affecting your community. Your challenge
          could become the starting point for a real-world innovation project.
        </p>
      </div>

      <form className="form-card" onSubmit={onSubmit}>
        <h2>Challenge Information</h2>
        <p className="muted">
          Provide enough information for JAN AI to identify suitable experts and partners.
        </p>

        <label>
          Challenge Title *
          <input name="title" required placeholder="Example: Lack of irrigation facilities for farmers" />
        </label>

        <label>
          Describe the Problem *
          <textarea
            name="description"
            required
            rows="5"
            placeholder="Describe what is happening, who is affected and why it matters..."
          />
        </label>

        <label>
          District
          <select name="district">
            <option>Ranchi</option>
            <option>Jamshedpur</option>
            <option>Dhanbad</option>
            <option>Bokaro</option>
            <option>Hazaribagh</option>
            <option>Dumka</option>
            <option>Giridih</option>
            <option>Deoghar</option>
          </select>
        </label>

        <label>
          Location / Village
          <input name="location" placeholder="Example: Tamar Block, Ranchi" />
        </label>

        <div className="upload-box">
          <div className="upload-icon">📎</div>
          <strong>Add supporting evidence</strong>
          <p>Photos, documents or other evidence can help researchers understand the challenge.</p>
          <button
            type="button"
            className="btn secondary"
            onClick={() => setUploaded(true)}
          >
            + Add Files
          </button>
          {uploaded && <span className="uploaded">✓ 2 demo files attached</span>}
        </div>

        <h2 className="form-subhead">Your Contact</h2>

        <div className="two-col">
          <label>
            Your Name
            <input name="name" placeholder="Enter your name" />
          </label>
          <label>
            Email / Phone
            <input name="contact" placeholder="Enter contact information" />
          </label>
        </div>

        <button className="btn primary submit" type="submit">
          Submit Challenge & Analyze with AI ✦
        </button>
      </form>
    </section>
  );
}

function Analysis({ data, navigate }) {
  const title = data?.title || "Unreliable irrigation for small farmers";
  const description = data?.description ||
    "Farmers in rural areas face difficulties accessing reliable irrigation during dry periods.";

  return (
    <section className="page-shell inner">
      <div className="ai-result">
        <div className="ai-header">
          <div className="ai-symbol">✦</div>
          <div>
            <div className="eyebrow">JAN AI ANALYSIS</div>
            <h1>Challenge Successfully Analyzed</h1>
          </div>
          <span className="ai-status">● AI MATCH COMPLETE</span>
        </div>

        <div className="analysis-grid">
          <div>
            <ResultCard label="CHALLENGE">
              <h2>{title}</h2>
              <p>{description}</p>
            </ResultCard>

            <ResultCard label="AI CATEGORIZATION">
              <div className="tags">
                <span>Agriculture</span>
                <span>Water Resources</span>
                <span>Rural Development</span>
              </div>
            </ResultCard>

            <ResultCard label="PRIORITY ASSESSMENT">
              <div className="priority">
                <div className="priority-circle">HIGH</div>
                <div>
                  <strong>High Priority</strong>
                  <p>Significant community impact with strong potential for an academic and industry-led solution.</p>
                </div>
              </div>
            </ResultCard>

            <ResultCard label="RECOMMENDED UNIVERSITY">
              <div className="partner">
                <div className="partner-logo">🎓</div>
                <div>
                  <strong>Birla Institute of Technology, Mesra</strong>
                  <p>Agriculture Technology · Water Systems · Rural Innovation</p>
                </div>
                <b className="match">94% Match</b>
              </div>
            </ResultCard>
          </div>

          <aside className="next-card">
            <div className="check">✓</div>
            <h2>Ready for Collaboration</h2>
            <p>
              The platform identified potential academic expertise and
              industry support for this challenge.
            </p>
            <button className="btn primary full" onClick={() => navigate("project")}>
              Create Innovation Project →
            </button>
            <button className="btn secondary full" onClick={() => navigate("dashboard")}>
              View in Dashboard
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Challenges({ navigate }) {
  return (
    <section className="page-shell inner">
      <div className="page-title">
        <div className="eyebrow">COMMUNITY CHALLENGES</div>
        <h1>Problems Waiting for Solutions</h1>
        <p>Explore challenges reported by communities nationwide.</p>
      </div>

      <div className="filter-row">
        {["All Challenges", "Agriculture", "Healthcare", "Water", "Education", "Environment"].map(
          (f, i) => <button className={i === 0 ? "filter active" : "filter"} key={f}>{f}</button>
        )}
      </div>

      <div className="challenge-grid">
        {challenges.map((c) => (
          <article className="challenge-card" key={c.title}>
            <div className="challenge-top">
              <span className="category-tag">{c.category}</span>
              <span className={`priority-tag ${c.priority.toLowerCase()}`}>{c.priority}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <div className="challenge-meta">
              <span>📍 {c.district}</span>
              <span>👥 {c.affected} affected</span>
            </div>
            <div className="challenge-footer">
              <span>AI Match: <strong>{c.match}</strong></span>
              <button onClick={() => navigate("analysis")}>View →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Dashboard({ navigate }) {
  return (
    <section className="page-shell inner">
      <div className="dashboard-header">
        <div>
          <div className="eyebrow">ADMIN / GOVERNMENT VIEW</div>
          <h1>Innovation Dashboard</h1>
          <p>Monitor challenges, projects and collaboration across communities.</p>
        </div>
        <div className="hero-actions">
          <button className="btn secondary" onClick={() => navigate("challenges")}>View Challenges</button>
          <button className="btn primary" onClick={() => navigate("report")}>+ New Challenge</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="📋" value="1,248" title="Total Challenges" note="Across 24 districts" />
        <StatCard icon="⚡" value="186" title="Under Evaluation" note="37 high priority" />
        <StatCard icon="🚀" value="73" title="Active Projects" note="28 in implementation" />
        <StatCard icon="🤝" value="42" title="Industry Partners" note="₹2.4 Cr committed" />
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h2>Recent Challenges</h2>
            <p>Latest citizen submissions requiring attention</p>
          </div>
          <button className="text-btn" onClick={() => navigate("challenges")}>View All →</button>
        </div>

        <div className="table">
          <div className="table-row head">
            <span>Challenge</span><span>District</span><span>Category</span><span>Priority</span><span>Status</span>
          </div>
          {[
            ["Irrigation access for farmers", "Ranchi", "Agriculture", "High", "AI Analyzed"],
            ["Village water quality monitoring", "Hazaribagh", "Water", "High", "University Match"],
            ["Rural health information access", "Dumka", "Healthcare", "Medium", "In Evaluation"],
            ["Digital learning infrastructure", "Giridih", "Education", "Medium", "Team Formation"]
          ].map((r) => (
            <div className="table-row" key={r[0]}>
              <strong>{r[0]}<small>Submitted recently</small></strong>
              <span>{r[1]}</span><span>{r[2]}</span>
              <span className={r[3] === "High" ? "high-text" : "medium-text"}>{r[3]}</span>
              <span className="status">{r[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Project({ navigate }) {
  return (
    <section className="page-shell inner">
      <button className="back" onClick={() => navigate("analysis")}>← Back to Analysis</button>

      <div className="project-header">
        <div>
          <div className="eyebrow">INNOVATION PROJECT</div>
          <h1>Smart Irrigation for Rural Communities</h1>
          <p>Turning the community challenge into a collaborative technology project.</p>
        </div>
        <span className="project-status">● ACTIVE</span>
      </div>

      <div className="project-grid">
        <div>
          <div className="project-card">
            <div className="card-head">
              <div><h2>Project Progress</h2><p>Implementation lifecycle</p></div>
              <strong>62%</strong>
            </div>
            <div className="progress"><span /></div>

            <div className="milestones">
              <Milestone done n="✓" title="Problem Validation" date="Completed · Aug 12" />
              <Milestone done n="✓" title="Solution Design" date="Completed · Aug 26" />
              <Milestone current n="3" title="Prototype Development" date="In progress · Due Sep 18" />
              <Milestone n="4" title="Field Testing" date="Upcoming" />
              <Milestone n="5" title="Implementation" date="Upcoming" />
            </div>
          </div>

          <div className="project-card">
            <div className="card-head">
              <div><h2>Industry Collaboration</h2><p>Partners supporting implementation</p></div>
              <button className="btn secondary">+ Invite Partner</button>
            </div>
            <Partner name="AgriTech Solutions" role="Technology & Field Implementation Partner" />
            <Partner name="Rural Innovation CSR Network" role="CSR Funding & Mentorship Partner" />
          </div>
        </div>

        <aside className="project-card">
          <h2>University Team</h2>
          <Team name="BIT Mesra" role="Computer Science & Agriculture" initials="BM" />
          <Team name="Dr. Rahul Kumar" role="Faculty Mentor" initials="RK" />
          <Team name="Student Innovation Cell" role="Project Team · 6 members" initials="SI" />

          <hr />

          <h3>Target Impact</h3>
          <div className="impact-mini">
            <strong>420+</strong><span>Farmers reached</span>
          </div>
          <div className="impact-mini">
            <strong>30%</strong><span>Target water efficiency gain</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Impact({ navigate }) {
  return (
    <section className="page-shell inner">
      <div className="page-title">
        <div className="eyebrow">COMMUNITY IMPACT</div>
        <h1>Innovation That Reaches People</h1>
        <p>Track measurable outcomes from projects created through JANA INNOVATE.</p>
      </div>

      <div className="impact-hero">
        <div>
          <div className="eyebrow">CUMULATIVE IMPACT</div>
          <h2>73 projects are creating measurable change.</h2>
          <p>
            Citizen challenges are moving from reports to prototypes,
            field testing and real implementation.
          </p>
        </div>
        <div className="big-number">73</div>
      </div>

      <div className="stats-grid">
        <StatCard icon="👥" value="28,400+" title="People reached" note="Across communities" />
        <StatCard icon="🏘️" value="96" title="Communities involved" note="Across 18 districts" />
        <StatCard icon="🎓" value="312" title="Students engaged" note="Multidisciplinary teams" />
        <StatCard icon="💼" value="42" title="Partners contributing" note="Industry + CSR" />
      </div>

      <div className="cta-panel">
        <div>
          <div className="eyebrow">JOIN THE NETWORK</div>
          <h2>Have a problem? Let's turn it into a project.</h2>
        </div>
        <button className="btn primary" onClick={() => navigate("report")}>Report a Challenge →</button>
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <strong>JANA INNOVATE</strong>
          <p>Connecting communities with knowledge, technology and action.</p>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("challenges")}>Challenges</button>
          <button onClick={() => navigate("dashboard")}>Dashboard</button>
          <button onClick={() => navigate("impact")}>Impact</button>
        </div>
      </div>
      <div className="copyright">Prototype • Smart India Hackathon</div>
    </footer>
  );
}

function Stat({ value, label }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}

function StatCard({ icon, value, title, note }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <strong>{value}</strong>
      <p>{title}</p>
      <small>{note}</small>
    </div>
  );
}

function Node({ icon, title, text, ai }) {
  return (
    <div className={`node ${ai ? "node-ai" : ""}`}>
      <div className="node-icon">{icon}</div>
      <strong>{title}</strong>
      <small>{text}</small>
    </div>
  );
}

function Step({ n, icon, title, text }) {
  return (
    <div className="step">
      <span className="step-number">{n}</span>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ResultCard({ label, children }) {
  return <div className="result-card"><span className="result-label">{label}</span>{children}</div>;
}

function Milestone({ done, current, n, title, date }) {
  return (
    <div className={`milestone ${done ? "done" : ""} ${current ? "current" : ""}`}>
      <span>{n}</span>
      <div><strong>{title}</strong><small>{date}</small></div>
    </div>
  );
}

function Partner({ name, role }) {
  return (
    <div className="industry-partner">
      <div className="partner-logo">🏢</div>
      <div><strong>{name}</strong><p>{role}</p></div>
      <span className="partner-active">Active</span>
    </div>
  );
}

function Team({ name, role, initials }) {
  return (
    <div className="team">
      <div className="avatar">{initials}</div>
      <div><strong>{name}</strong><small>{role}</small></div>
    </div>
  );
}

export default App;
