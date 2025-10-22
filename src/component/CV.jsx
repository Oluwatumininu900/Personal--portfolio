import React from "react";
import "./CV.css";

/**
 * Live CV component
 *
 * Place your profile image at: /public/profile.jpg
 * - or update the img src to point to your preferred path.
 */

const CV = () => {
  // Content (based on your info)
  const name = "Oginni Oluwatumininu Oluwajuwon";
  const title = "Frontend Developer";
  const about = `A passionate and creative frontend developer who loves bringing designs to life with clean, interactive code. I believe in learning consistently, building useful projects, and growing through every challenge.`;
  const skills = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git", "Responsive Design"];
  const education = {
    school: "National Open University of Nigeria (NOUN)",
    course: "B.Sc. Computer Science — Year 1"
  };
  const projects = [
    { name: "Quiz App", desc: "Interactive quiz with dynamic scoring, built with React." },
    { name: "Timer", desc: "Reading / session timer built with React and hooks." },
    { name: "To-Do List", desc: "Task manager with add/remove and reorder features." },
    { name: "Calculator", desc: "Responsive arithmetic calculator built in React." },
    { name: "Mini Shop", desc: "Product display & cart demo using React." }
  ];
  const contact = {
    phone: "07053020067",
    email: "oginniolueatumininu@gmail.com"
  };

  // Default public image path: place your image at public/profile.jpg
  const profileSrc = "/now.jpeg";

  return (
    <section className="cv-container" aria-labelledby="cv-heading">
      <div className="cv-card">
        <aside className="cv-side">
          <div className="cv-photo-wrap">
            <img src={profileSrc} alt={`${name} profile`} className="cv-photo" />
          </div>

          <h1 className="cv-name">{name}</h1>
          <p className="cv-title">{title}</p>

          <div className="cv-contact">
            <h4>Contact</h4>
            <a href={`mailto:${contact.email}`} className="cv-contact-link">{contact.email}</a>
            <a href={`tel:${contact.phone}`} className="cv-contact-link">{contact.phone}</a>
          </div>

          <div className="cv-skills">
            <h4>Skills</h4>
            <ul>
              {skills.map((s) => (
                <li key={s} className="cv-skill">{s}</li>
              ))}
            </ul>
          </div>

          <div className="cv-education">
            <h4>Education</h4>
            <p className="edu-school">{education.school}</p>
            <p className="edu-course">{education.course}</p>
          </div>
        </aside>

        <main className="cv-main">
          <header>
            <h2 id="cv-heading" className="sr-only">Curriculum Vitae — {name}</h2>
            <div className="cv-about">
              <h3>About Me</h3>
              <p>{about}</p>
            </div>
          </header>

          <section className="cv-projects">
            <h3>Selected Projects</h3>
            <div className="project-list">
              {projects.map((p) => (
                <article key={p.name} className="project-item">
                  <h4 className="project-title">{p.name}</h4>
                  <p className="project-desc">{p.desc}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-actions">
            <a className="btn-primary" href="contacts">Email Me</a>
          {/* <Link to="/contact" className="cal-1"><button className="btn-primary">Email Me</button></Link> */}
            <a className="btn-ghost" href="/#projects">View Projects</a>
          </section>
        </main>
      </div>
    </section>
  );
};

export default CV;
