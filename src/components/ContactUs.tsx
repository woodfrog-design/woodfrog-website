import React, { useState, useEffect, useRef } from 'react';
import styles from './ContactUs.module.css';
import { useTheme } from '../ThemeContext';
import CustomModal from './CustomModal';
import CustomButton from './CustomButton';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// --- Custom Hook to detect clicks outside the dropdown ---
// --- THIS IS THE FINAL FIX: The type for 'ref' now explicitly allows null ---
const useClickOutside = (ref: React.RefObject<HTMLDivElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

// --- (Service list and Icon components are unchanged) ---
const allServices = ["AI & ML Strategy Development", "Product Development", "Enterprise Data Management", "Advanced Analytics", "Custom LLM Solutions", "Automation & Scaling", "Intelligent Agents", "Benchmarking and Evaluation", "None of the above / Other"];
const MessageIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path> </svg> );
const EmailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path> <polyline points="22,6 12,13 2,6"></polyline> </svg> );
const PhoneIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path> </svg> );
const BuildingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect> <line x1="12" y1="6" x2="12" y2="6"></line> <line x1="12" y1="12" x2="12" y2="12"></line> <line x1="12" y1="18" x2="12" y2="18"></line> </svg> );
const UserIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle> </svg> );
const ArrowRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> );

// --- (Interfaces are unchanged) ---
interface ContactFormProps { isModalVisible: boolean; setIsModalVisible: (visible: boolean) => void; className?: string; }
interface FormData { firstName: string; lastName: string; email: string; phone: string; organization: string; services: string[]; message: string; }
interface FormErrors { firstName?: string; lastName?: string; email?: string; message?: string; }

const ContactForm: React.FC<ContactFormProps> = ({ isModalVisible, setIsModalVisible, className = '' }) => {
  const { isDarkTheme } = useTheme();
  // --- (State and other functions are unchanged) ---
  const [formData, setFormData] = useState<FormData>({ firstName: '', lastName: '', email: '', phone: '', organization: '', services: [], message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));


  useEffect(() => {
    if (isModalVisible && !isSubmitting && !submitSuccess) {
      setFormData({ firstName: '', lastName: '', email: '', phone: '', organization: '', services: [], message: '' });
      setFormErrors({});
      setIsDropdownOpen(false);
    }
  }, [isModalVisible, isSubmitting, submitSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) { setFormErrors((prev) => ({ ...prev, [name]: undefined })); }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
        const newServices = prev.services.includes(service)
            ? prev.services.filter(s => s !== service)
            : [...prev.services, service];
        return { ...prev, services: newServices };
    });
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) { errors.email = 'Email is required'; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { errors.email = 'Email is invalid'; }
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), { ...formData, timestamp: serverTimestamp() });
      await fetch('/.netlify/functions/contactNotification', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalVisible(false);
        setTimeout(() => {
          setFormData({ firstName: '', lastName: '', email: '', phone: '', organization: '', services: [], message: '' });
          setSubmitSuccess(false); setFormErrors({}); setIsSubmitting(false);
        }, 300);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
      setIsSubmitting(false);
    }
  };
  const getInputStyle = (fieldName: keyof FormErrors) => `${styles.input} ${isDarkTheme ? styles.darkInput : ''} ${formErrors[fieldName] ? styles.inputError : ''}`;
  const handleModalClose = () => { if (isSubmitting) return; setIsModalVisible(false); setTimeout(() => { if (submitSuccess) setSubmitSuccess(false); }, 300); };

  const availableServices = allServices.filter(s => !formData.services.includes(s));

  return (
    <CustomModal isOpen={isModalVisible} onClose={handleModalClose} title="Let's Talk!" className={`${styles.contactModal} ${className}`} size="small" >
      <div id="formdata-anchor" style={{ position: 'relative', top: '-100px' }}></div>
      {submitSuccess ? ( <div className={styles.successMessage}>...</div> ) : (
        <form id="formdata" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}> <label htmlFor="firstName" className={styles.label}> First Name <span className={styles.required}>*</span> </label> <div className={styles.inputWrapper}> <span className={styles.inputIcon}> <UserIcon /> </span> <input type="text" id="firstName" name="firstName" className={getInputStyle('firstName')} value={formData.firstName} onChange={handleChange} placeholder="Your first name" /> </div> {formErrors.firstName && ( <div className={styles.errorText} role="alert"> {formErrors.firstName} </div> )} </div>
            <div className={styles.formGroup}> <label htmlFor="lastName" className={styles.label}> Last Name <span className={styles.required}>*</span> </label> <div className={styles.inputWrapper}> <span className={styles.inputIcon}> <UserIcon /> </span> <input type="text" id="lastName" name="lastName" className={getInputStyle('lastName')} value={formData.lastName} onChange={handleChange} placeholder="Your last name" /> </div> {formErrors.lastName && ( <div className={styles.errorText} role="alert"> {formErrors.lastName} </div> )} </div>
          </div>
          <div className={styles.formGroup}> <label htmlFor="email" className={styles.label}> Email <span className={styles.required}>*</span> </label> <div className={styles.inputWrapper}> <span className={styles.inputIcon}> <EmailIcon /> </span> <input type="email" id="email" name="email" className={getInputStyle('email')} value={formData.email} onChange={handleChange} placeholder="Your email address" /> </div> {formErrors.email && ( <div className={styles.errorText} role="alert"> {formErrors.email} </div> )} </div>
          <div className={styles.formGroup}> <label htmlFor="phone" className={styles.label}> Phone </label> <div className={styles.inputWrapper}> <span className={styles.inputIcon}> <PhoneIcon /> </span> <input type="tel" id="phone" name="phone" className={`${styles.input} ${isDarkTheme ? styles.darkInput : ''}`} value={formData.phone} onChange={handleChange} placeholder="+1-212-456-7890" /> </div> </div>
          <div className={styles.formGroup}> <label htmlFor="organization" className={styles.label}> Organization </label> <div className={styles.inputWrapper}> <span className={styles.inputIcon}> <BuildingIcon /> </span> <input type="text" id="organization" name="organization" className={`${styles.input} ${isDarkTheme ? styles.darkInput : ''}`} value={formData.organization} onChange={handleChange} placeholder="Your company/organization (optional)" /> </div> </div>
          
          <div className={styles.formGroup}>
              <label className={styles.label}>Services of Interest</label>
              <div className={styles.dropdownWrapper} ref={dropdownRef}>
                <div className={styles.selectedContainer} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {formData.services.length > 0 ? (
                      formData.services.map(service => (
                          <button type="button" key={service} onClick={(e) => { e.stopPropagation(); handleServiceToggle(service); }} className={`${styles.tag} ${styles.selectedTag}`}>
                              {service} <span>×</span>
                          </button>
                      ))
                  ) : (
                      <span className={styles.placeholderText}>Click to select services...</span>
                  )}
                </div>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {availableServices.map((service, index) => (
                      <button 
                        type="button" 
                        key={service} 
                        onClick={() => handleServiceToggle(service)} 
                        className={styles.tag}
                        style={{'--color-index': index} as React.CSSProperties}
                      >
                          {service} <span>+</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
          </div>

          <div className={styles.formGroup}> <label htmlFor="message" className={styles.label}> Message <span className={styles.required}>*</span> </label> <textarea id="message" name="message" className={`${styles.textarea} ${isDarkTheme ? styles.darkTextarea : ''} ${formErrors.message ? styles.inputError : ''}`} value={formData.message} onChange={handleChange} rows={4} placeholder="Type your message here" ></textarea> {formErrors.message && ( <div className={styles.errorText} role="alert"> {formErrors.message} </div> )} </div>
          <div className={styles.formActions}> <CustomButton type="primary" htmlType="submit" disabled={isSubmitting} className={styles.submitButtonFull} > {isSubmitting ? ( <> <svg className={styles.spinningIcon} viewBox="0 0 24 24" > <path d="M21 12a9 9 0 1 1-6.219-8.56"></path> </svg> Sending... </> ) : ( <> Submit <ArrowRightIcon /> </> )} </CustomButton> </div>
        </form>
      )}
    </CustomModal>
  );
};

export default ContactForm;