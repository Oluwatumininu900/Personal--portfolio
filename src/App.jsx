import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./component/Navbar";
import { Hero } from "./component/Hero";
import Projects from "./component/Projects";
import { Contacts } from "./component/Contacts";
import Cal from "./component/Cal";
import { useState, useEffect } from 'react';
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import FormulaFinder from "./component/FormulaFinder";
import ToDoList from './component/ToDoList';
import Timer from './component/Timer';
import Quize from './component/Quize';
import Minishop from "./component/Minishop";
import CV from "./component/CV";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <Router>
      <div className={`app ${isLoaded ? "loaded" : ""}`}>
        <Navbar />

        {/* ✅ Only one <Routes> wrapper */}
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Projects />
                <Contacts />
                {/* <Route path="/contact" element={<Contacts/>}  /> */}
              </>
            } 
          />

          {/* Individual Routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/calculator" element={<Cal />} />
          <Route path="/formula" element={<FormulaFinder />} />
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/quize" element={<Quize />} />
          <Route path="/minishop" element={<Minishop />} />
          <Route path="/cv" element={<CV />} />
        </Routes>

        {/* Footer */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>&copy; 2025 Juwon💜. All Rights Reserved.</p>
          <marquee>Thanks for visiting my portfolio 💜</marquee>
        </motion.footer>
      </div>
    </Router>
  );
}

export default App;
