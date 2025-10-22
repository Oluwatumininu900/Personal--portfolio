import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>

      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Link to="/todolist" className="to">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('now-1.jpg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>To-do-list</h3>
            <p>
              Stop juggling tasks in your head. This project offers a quick,
              intuitive way to capture and prioritize everything, helping you
              stay focused and achieve your goals.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>

        <Link to="/timer" className="to">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('/now-2.jpg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>Timer</h3>
            <p>
              Reading Session Tracker. Stop guessing how long you read for! This
              simple tool lets you log dedicated reading time and provides timed
              encouragement to help you stay focused, turn pages, and build a
              daily habit.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>

        <Link to="/quize" className="to">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('/now-3.jpg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>Quiz</h3>
            <p>
              Developer Readiness Quiz. Challenge your core front-end skills.
              This React app delivers 20 quick questions across HTML, CSS,
              JavaScript, and React, providing a percentage score and a clear
              final grade.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>

        <Link to="/calculator" className="cal-1">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('/now-4.jpg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>Standard Calculator</h3>
            <p>
              A fully functional arithmetic calculator using a simple grid layout
              and basic operation logic.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>

        <Link to="/minishop" className="cal-1">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('/now-5.jpg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>Mini Shop</h3>
            <p>
              A mini e-commerce project to simulate product browsing and cart
              functionality with React.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>
        <Link to="/cv" className="cal-1">
          <motion.div
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{ backgroundImage: "url('/now.jpeg')" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>CV</h3>
            <p>
              Every line of this CV reflects growth, creativity, and passion for frontend development — proudly built with React, JavaScript, and CSS.
            </p>
            <div className="project-tech">
              <span>JavaScript</span>
              <span>React</span>
              <span>CSS</span>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Projects;
