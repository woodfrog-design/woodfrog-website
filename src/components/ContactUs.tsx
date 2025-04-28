import React, { useState, useEffect } from 'react';
import styles from './ContactUs.module.css';
import { useTheme } from "../ThemeContext";
import CustomModal from './CustomModal';
import CustomButton from './CustomButton';
import { addDoc, collection, serverTimestamp, } from 'firebase/firestore';
import { db } from '../firebase';

// Message icon component
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

// Email icon component
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Phone icon component
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// Building icon component
const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="6" x2="12" y2="6"></line>
    <line x1="12" y1="12" x2="12" y2="12"></line>
    <line x1="12" y1="18" x2="12" y2="18"></line>
  </svg>
);

// User icon component
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Arrow right icon component
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

interface ContactFormProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  className?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  isModalVisible,
  setIsModalVisible,
  className = ''
}) => {
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form when modal is opened
  useEffect(() => {
    if (isModalVisible) {
      // Only reset if not submitting and not showing success
      if (!isSubmitting && !submitSuccess) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          organization: '',
          message: ''
        });
        setFormErrors({});
      }
    }
  }, [isModalVisible, isSubmitting, submitSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('test');
   
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    try {
      // Save to Firebase
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp(),
      });
  
      // Send Slack Notification via Netlify Function
      await fetch('/.netlify/functions/contactNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // If both succeed:
      setSubmitSuccess(true);
  
      // Reset modal and form after showing success
      setTimeout(() => {
        setIsModalVisible(false);
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            organization: '',
            message: '',
          });
          setSubmitSuccess(false);
          setFormErrors({});
          setIsSubmitting(false);
        }, 300);
      }, 2000);
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Determine form field styles with improved dark mode support
  const getInputStyle = (fieldName: keyof FormErrors) => {
    return `${styles.input} ${isDarkTheme ? styles.darkInput : ''} ${formErrors[fieldName] ? styles.inputError : ''}`;
  };

  // Handle modal close
  const handleModalClose = () => {
    // Don't allow closing during submission
    if (isSubmitting) return;

    setIsModalVisible(false);

    // Reset states after animation completes
    setTimeout(() => {
      if (submitSuccess) {
        setSubmitSuccess(false);
      }
    }, 300);
  };

  return (
    <>
      <CustomModal
        isOpen={isModalVisible}
        onClose={handleModalClose}
        title="Let's Talk!"
        className={`${styles.contactModal} ${className}`}
        size="small"

      >
        <div id="formdata-anchor" style={{ position: 'relative', top: '-100px' }}></div> {/*  for smooth scrolling*/}
        {submitSuccess ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className={styles.successTitle}>Thank You!</h3>
            <p className={styles.successText}>
              Your message has been sent successfully. We'll get back to you soon.
            </p>
          </div>
        ) : (

          <form id='formdata' onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><UserIcon /></span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={getInputStyle('firstName')}
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    autoComplete="given-name"
                    aria-required="true"
                    pattern="[A-Za-z\s]+"
                    title="Only letters are allowed"
                  />
                </div>
                {formErrors.firstName && (
                  <div className={styles.errorText} role="alert">{formErrors.firstName}</div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}><UserIcon /></span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={getInputStyle('lastName')}
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    autoComplete="family-name"
                    aria-required="true"
                    pattern="[A-Za-z\s]+"
                    title="Only letters are allowed"
                  />
                </div>
                {formErrors.lastName && (
                  <div className={styles.errorText} role="alert">{formErrors.lastName}</div>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><EmailIcon /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={getInputStyle('email')}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
              {formErrors.email && (
                <div className={styles.errorText} role="alert">{formErrors.email}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><PhoneIcon /></span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`${styles.input} ${isDarkTheme ? styles.darkInput : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-212-456-7890"
                  autoComplete="tel"
                  pattern="^\+[\d\s\-().]{7,20}$"
                  inputMode="tel"
                  maxLength={20}
                  title="Enter a valid phone number starting with +. Allowed: digits, spaces, dashes, parentheses"
                />

              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="organization" className={styles.label}>
                Organization
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><BuildingIcon /></span>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className={`${styles.input} ${isDarkTheme ? styles.darkInput : ''}`}
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Your company/organization (optional)"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={`${styles.textarea} ${isDarkTheme ? styles.darkTextarea : ''} ${formErrors.message ? styles.inputError : ''}`}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your message here"
                aria-required="true"
              ></textarea>
              {formErrors.message && (
                <div className={styles.errorText} role="alert">{formErrors.message}</div>
              )}
            </div>

            <div className={styles.formActions}>
              <CustomButton
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                className={styles.submitButtonFull}
              >
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinningIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Submit
                    <span style={{ marginLeft: '8px' }}><ArrowRightIcon /></span>
                  </>
                )}
              </CustomButton>
            </div>
          </form>
        )}
      </CustomModal>
    </>
  );
};

export default ContactForm;