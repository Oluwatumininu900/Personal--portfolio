import { motion } from "framer-motion";
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

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        <motion.div className="hero-content" 
        variants={staggerContainer} 
        initial="initial" 
        animate="animate"> 
          <motion.div className="hero-barge">
            <span>👋 Hello, I'm</span>
          </motion.div>
          <motion.h1 className="glitch"
           variants={fadeInUp} 
           whileHover={{scale: 1.02}}>
            Oginni Oluwatumininu Oluwajuwon
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            Frontend Developer | Content Creator | Farm Manager
            </motion.h2>
            <motion.p className="hero-description" variants={fadeInUp}>
                I love coding and bringing creative ideas to life through interactive web experiences. I’m passionate about inspiring others emotionally, and I have a deep love for animals—especially birds. My coding journey began back in SS3, long before I even owned a PC—I used to write code on paper.
            </motion.p>

            <motion.div className="cta-buttons" variants={staggerContainer}> 
                <motion.a href="#projects"
                 className="cta-primary"
                        whileHover={{scale:1.05}}
                        whileTap={{scale:0.95}}>
                    View My Work
                    </motion.a>
                    <motion.a href="#contacts" 
                    className="cta-secondary"
                        whileHover={{scale:1.05}}
                        whileTap={{scale:0.95}}>
                    Contact Me
                    </motion.a>
            </motion.div>
            <motion.div 
            className="social-links" 
            variants={staggerContainer}>
                <motion.a target="_blank" href="https://github.com">
                  <i className="fab fa-github"></i>
                </motion.a>
                <motion.a target="_blank" href="https://linkedin.com">
                  <i className="fab fa-linkedin"></i>
                </motion.a>
                <motion.a target="_blank">
                  <i className="fab fa-twitter" href="https://x.com"></i>
                </motion.a>
            </motion.div>
        </motion.div>
        <motion.div className="hero-image-container" 
        initial={{ opacity: 0, x:50 }}
        animate={{ opacity: 1, x:0 }}
        transition={{ duration:0.8, dely:0.4}}>

          <div className="code-display">
            <img src="now.jpeg"   alt="My profile" className="me"/>
          </div>

        </motion.div>
        <motion.div className="floating-card" 
        animate={{ y: [0, -10, 0], rotate:[0, 2, 0]}} 
        transition={{ duration: 4, repeat:Infinity, ease:"easeInOut"}}>
          <div className="card-content">
            <span className="card-icon">🤗</span>
            <span className="card-text">My Current Picture</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
