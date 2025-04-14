// import React, { FunctionComponent, useState, useEffect } from "react";
// // import Modal from "react-modal";
// import { useTheme } from "../ThemeContext";
// import { useLocation } from "react-router-dom";
// import styles from "./ContactForm.module.css";

// // Bind modal to your app element for accessibility
// // This should be called once in your app
// if (typeof window !== "undefined") {
//   Modal.setAppElement("#root"); // Update this to match your root element (e.g., #root, #__next)
// }

// interface ContactFormData {
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   subject: string;
//   message: string;
// }

// const ContactForm: FunctionComponent = () => {
//   const { isDarkTheme } = useTheme();
//   const location = useLocation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState<ContactFormData>({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     subject: "",
//     message: "",
//   });
//   const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [submitButtonProps, setSubmitButtonProps] = useState({
//     text: "Send Message",
//     icon: "send"
//   });

//   // For direct form submission on the page, not in modal
//   const [isPageSubmitting, setIsPageSubmitting] = useState(false);
//   const [pageSubmitSuccess, setPageSubmitSuccess] = useState(false);
  
//   // Check if we should open the modal automatically (from URL state)
//   useEffect(() => {
//     if (location.state && location.state.openModal) {
//       setIsModalOpen(true);
//     }
//   }, [location]);

//   // Handle input changes for both form and modal
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
    
//     // Clear error when user starts typing
//     if (formErrors[name as keyof ContactFormData]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   // Form validation
//   const validateForm = () => {
//     const errors: Partial<ContactFormData> = {};
    
//     if (!formData.name.trim()) errors.name = "Name is required";
    
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Email is invalid";
//     }
    
//     if (!formData.message.trim()) errors.message = "Message is required";
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle form submission on the page
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsPageSubmitting(true);
//     setSubmitButtonProps({
//       text: "Sending...",
//       icon: "loading"
//     });
    
//     try {
//       // Replace with your actual API call
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      
//       // Success
//       setPageSubmitSuccess(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         company: "",
//         subject: "",
//         message: "",
//       });
      
//       setSubmitButtonProps({
//         text: "Message Sent!",
//         icon: "check"
//       });
      
//       // Reset form after success
//       setTimeout(() => {
//         setPageSubmitSuccess(false);
//         setSubmitButtonProps({
//           text: "Send Message",
//           icon: "send"
//         });
//       }, 3000);
      
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitButtonProps({
//         text: "Error - Try Again",
//         icon: "error"
//       });
      
//       setTimeout(() => {
//         setSubmitButtonProps({
//           text: "Send Message",
//           icon: "send"
//         });
//       }, 3000);
//     } finally {
//       setIsPageSubmitting(false);
//     }
//   };

//   // Handle modal form submission (separate from main form)
//   const handleModalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsSubmitting(true);
    
//     try {
//       // Replace with your actual API call
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      
//       // Success
//       setSubmitSuccess(true);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         company: "",
//         subject: "",
//         message: "",
//       });
      
//       // Close modal after success message
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setSubmitSuccess(false);
//       }, 3000);
      
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("There was an error submitting your form. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Open modal handler
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Close modal handler
//   const closeModal = () => {
//     // Reset form state when closing
//     setIsModalOpen(false);
//     setFormErrors({});
//     setSubmitSuccess(false);
//   };

//   // Icon components
//   const sendIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="22" y1="2" x2="11" y2="13"></line>
//       <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//     </svg>
//   );

//   const loadingIcon = (
//     <svg className={styles.spinningIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
//     </svg>
//   );

//   const checkIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="20 6 9 17 4 12"></polyline>
//     </svg>
//   );

//   const errorIcon = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <circle cx="12" cy="12" r="10"></circle>
//       <line x1="12" y1="8" x2="12" y2="12"></line>
//       <line x1="12" y1="16" x2="12.01" y2="16"></line>
//     </svg>
//   );

//   // Get the current icon based on button state
//   const getCurrentIcon = () => {
//     switch (submitButtonProps.icon) {
//       case "loading": return loadingIcon;
//       case "check": return checkIcon;
//       case "error": return errorIcon;
//       default: return sendIcon;
//     }
//   };

//   return (
//     <div className={styles.contactFormContainer}>
//       {/* Main form on the page */}
//       <form onSubmit={handleSubmit} className={styles.contactForm}>
//         <div className={styles.formFields}>
//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="name" className={styles.formLabel}>
//                 Name <span className={styles.required}>*</span>
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className={`${styles.formInput} ${formErrors.name ? styles.inputError : ""}`}
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//               />
//               {formErrors.name && <div className={styles.errorText}>{formErrors.name}</div>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="email" className={styles.formLabel}>
//                 Email <span className={styles.required}>*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className={`${styles.formInput} ${formErrors.email ? styles.inputError : ""}`}
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Your email address"
//               />
//               {formErrors.email && <div className={styles.errorText}>{formErrors.email}</div>}
//             </div>
//           </div>

//           <div className={styles.formRow}>
//             <div className={styles.formGroup}>
//               <label htmlFor="phone" className={styles.formLabel}>
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 className={styles.formInput}
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Your phone number (optional)"
//               />
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="company" className={styles.formLabel}>
//                 Company
//               </label>
//               <input
//                 type="text"
//                 id="company"
//                 name="company"
//                 className={styles.formInput}
//                 value={formData.company}
//                 onChange={handleChange}
//                 placeholder="Your company (optional)"
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="subject" className={styles.formLabel}>
//               Subject
//             </label>
//             <select
//               id="subject"
//               name="subject"
//               className={styles.formSelect}
//               value={formData.subject}
//               onChange={handleChange}
//             >
//               <option value="">Select a subject</option>
//               <option value="General Inquiry">General Inquiry</option>
//               <option value="Project Proposal">Project Proposal</option>
//               <option value="Support Request">Support Request</option>
//               <option value="Partnership">Partnership</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="message" className={styles.formLabel}>
//               Message <span className={styles.required}>*</span>
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               className={`${styles.formTextarea} ${formErrors.message ? styles.inputError : ""}`}
//               value={formData.message}
//               onChange={handleChange}
//               rows={6}
//               placeholder="Your message"
//             ></textarea>
//             {formErrors.message && <div className={styles.errorText}>{formErrors.message}</div>}
//           </div>
//         </div>

//         <div className={styles.formActions}>
//           <button
//             type="submit"
//             className={`${styles.submitButton} ${pageSubmitSuccess ? styles.successButton : ""}`}
//             disabled={isPageSubmitting}
//           >
//             <span className={styles.buttonIcon}>
//               {getCurrentIcon()}
//             </span>
//             <span>{submitButtonProps.text}</span>
//           </button>
//         </div>
//       </form>

//       {/* Popup Modal Version */}
//       <div className={styles.popupContainer}>
//         <p className={styles.popupText}>
//           Rather use a popup form? <button type="button" onClick={openModal} className={styles.popupButton}>Click here</button>
//         </p>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Contact Form"
//         className={`${styles.contactModal} ${isDarkTheme ? styles.darkTheme : ""}`}
//         overlayClassName={`${styles.modalOverlay} ${isDarkTheme ? styles.darkOverlay : ""}`}
//         closeTimeoutMS={300}
//         preventScroll={true}
//         shouldCloseOnOverlayClick={true}
//         shouldFocusAfterRender={true}
//         style={{
//           overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 1000,
//           },
//           content: {
//             position: "relative",
//             top: "auto",
//             left: "auto",
//             right: "auto",
//             bottom: "auto",
//             border: "none",
//             background: "transparent",
//             overflow: "auto",
//             borderRadius: 0,
//             outline: "none",
//             padding: 0,
//             margin: "0 auto",
//           }
//         }}
//       >
//         <div className={styles.modalContent}>
//           <button 
//             className={styles.closeButton} 
//             onClick={closeModal}
//             aria-label="Close"
//           >
//             ×
//           </button>
          
//           <h2 className={styles.modalTitle}>Contact Us</h2>
          
//           {submitSuccess ? (
//             <div className={styles.successMessage}>
//               <div className={styles.successIcon}>✓</div>
//               <h3 className={styles.successTitle}>Thank You!</h3>
//               <p className={styles.successText}>Your message has been sent successfully. We'll get back to you soon.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleModalSubmit} className={styles.modalForm}>
//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="modal-name" className={styles.formLabel}>
//                     Name <span className={styles.required}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="modal-name"
//                     name="name"
//                     className={`${styles.formInput} ${formErrors.name ? styles.inputError : ""}`}
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Your name"
//                   />
//                   {formErrors.name && <div className={styles.errorText}>{formErrors.name}</div>}
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="modal-email" className={styles.formLabel}>
//                     Email <span className={styles.required}>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="modal-email"
//                     name="email"
//                     className={`${styles.formInput} ${formErrors.email ? styles.inputError : ""}`}
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Your email address"
//                   />
//                   {formErrors.email && <div className={styles.errorText}>{formErrors.email}</div>}
//                 </div>
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.formGroup}>
//                   <label htmlFor="modal-phone" className={styles.formLabel}>
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     id="modal-phone"
//                     name="phone"
//                     className={styles.formInput}
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Your phone number (optional)"
//                   />
//                 </div>

//                 <div className={styles.formGroup}>
//                   <label htmlFor="modal-company" className={styles.formLabel}>
//                     Company
//                   </label>
//                   <input
//                     type="text"
//                     id="modal-company"
//                     name="company"
//                     className={styles.formInput}
//                     value={formData.company}
//                     onChange={handleChange}
//                     placeholder="Your company (optional)"
//                   />
//                 </div>
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="modal-subject" className={styles.formLabel}>
//                   Subject
//                 </label>
//                 <select
//                   id="modal-subject"
//                   name="subject"
//                   className={styles.formSelect}
//                   value={formData.subject}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select a subject</option>
//                   <option value="General Inquiry">General Inquiry</option>
//                   <option value="Project Proposal">Project Proposal</option>
//                   <option value="Support Request">Support Request</option>
//                   <option value="Partnership">Partnership</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="modal-message" className={styles.formLabel}>
//                   Message <span className={styles.required}>*</span>
//                 </label>
//                 <textarea
//                   id="modal-message"
//                   name="message"
//                   className={`${styles.formTextarea} ${formErrors.message ? styles.inputError : ""}`}
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={5}
//                   placeholder="Your message"
//                 ></textarea>
//                 {formErrors.message && <div className={styles.errorText}>{formErrors.message}</div>}
//               </div>

//               <div className={styles.formActions}>
//                 <button
//                   type="button"
//                   className={styles.cancelButton}
//                   onClick={closeModal}
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ContactForm;

export {};
