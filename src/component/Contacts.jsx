import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// import { preview } from "vite"; // Not needed, can be removed

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

export const Contacts = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Set status to submitting
    setFormStatus({
      submitting: true, // Set to true while the async call is running
      success: false,
      error: false,
      message: "Sending...",
    });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Set status to success on successful send
      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Message sent successfully! Thank you.",
      });
      // Optionally clear the form
      setFormData({ name: "", email: "", message: "" }); 

    // In Contacts.jsx, update the catch block:

} catch (error) {
  // 3. Set status to error if the send fails
  console.error("EmailJS Error:", error);
  // Log the error object details
  console.error("Full Error Details:", JSON.stringify(error, null, 2)); 
  
  // The rest of the error setting...
  setFormStatus({
    submitting: false,
    success: false,
    error: true,
    message: "Failed to send message. Please try again.",
  });
}
  };

  return (
    <motion.section 
      id="contacts"
      className="contact"
      // ❌ REMOVED onSubmit={handleSubmit} from here
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        variants={fadeInUp}
        initial="initial"
        whileInView="animate" // Changed animate to whileInView for the heading
        viewport={{ once: true }}
      >
        Get In Touch With Me
      </motion.h2>

      <motion.div
        className="contact-content"
        variants={fadeInUp}
      >
        {/* ✅ ADDED onSubmit={handleSubmit} to the form */}
        <motion.form className="contact-form" onSubmit={handleSubmit}> 
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name..."
            whileFocus={{ scale: 1.02 }}
            required
            onChange={handleInputChange}
            value={formData.name} // Added value binding
            // ❌ Removed the incorrect onSubmit={handleSubmit}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email..."
            whileFocus={{ scale: 1.02 }}
            required
            onChange={handleInputChange}
            value={formData.email} // Added value binding
          />
          <motion.textarea
            name="message"
            placeholder="Your Message..."
            whileFocus={{ scale: 1.02 }}
            required
            onChange={handleInputChange}
            value={formData.message} // Added value binding
          />
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={formStatus.submitting}
          >
            {formStatus.submitting ? "Sending..." : "Send Me A Message"}
          </motion.button>

          {/* ✅ Fixed message display is here, and it will now work because handleSubmit is attached to the form */}
          {formStatus.message && (
            <p
              className={`form-message ${
                formStatus.error ? "error" : formStatus.success ? "success" : ""
              }`}
            >
              {formStatus.message}
            </p>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
};