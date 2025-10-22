import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="logo">Portfolio</div>

      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/Projects" className="nav-link">Projects</Link>
        </li>
        <li>
          <Link to="/Contacts" className="nav-link">Contact Us</Link>
        </li>
      </ul>
    </motion.nav>
  );
};
