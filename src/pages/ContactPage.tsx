import { FunctionComponent, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./ContactPage.module.css";
import HeaderComponet from "../components/HeaderComponent";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { MailOutlined, PhoneOutlined, GlobalOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import ContactForm from '../components/ContactUs';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ContactPage: FunctionComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Submit to Firebase (Firestore)
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                timestamp: serverTimestamp(),
            });

            // Send Slack/email notification using Netlify Function
            await fetch('/.netlify/functions/contactNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            alert('Thank you for your message! We will get back to you soon.');

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        }
    };

    return (
        <div className={styles.contactUsPage}>
            <HeaderComponet />

            <main className={styles.mainContent}>
                <PageHero
                    title="Let's Talk!"
                    description="We'd love to hear from you. Fill out the form and we'll get back to you soon."
                />

                <section className={styles.contactFormSection}>
                    <div className="container">
                        <div className="row justify-content-center ${styles.cardsRow}">
                            <div className="col-12 col-lg-6 mb-4">
                                <div className={styles.contactCard}>
                                    <div className={styles.contactSection}>
                                        <h3 className={styles.sectionTitle}>Send Us a Message</h3>
                                        <p className={styles.sectionDescription}>
                                            Have a question about our services or want to learn more? Our team is here to help.
                                        </p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className={styles.formGroup}>
                                                        <label className={styles.formLabel}>
                                                            <UserOutlined className={styles.formIcon} />
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={styles.formInput}
                                                            placeholder="First Name"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            onChange={handleInputChange}
                                                            required
                                                            pattern="[A-Za-z\s]+"
                                                            title="Only letters are allowed"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className={styles.formGroup}>
                                                        <label className={styles.formLabel}>
                                                            <UserOutlined className={styles.formIcon} />
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={styles.formInput}
                                                            placeholder="Last Name"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            onChange={handleInputChange}
                                                            required
                                                            pattern="[A-Za-z\s]+"
                                                            title="Only letters are allowed"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>
                                                    <MailOutlined className={styles.formIcon} />
                                                </label>
                                                <input
                                                    type="email"
                                                    className={styles.formInput}
                                                    placeholder="Email Address"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label className={styles.formLabel}>
                                                    <PhoneOutlined className={styles.formIcon} />
                                                </label>
                                                <input
                                                    type="tel"
                                                    className={styles.formInput}
                                                    placeholder="+1-212-456-7890"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    pattern="^\+[\d\s\-().]{7,20}$"
                                                    inputMode="tel"
                                                    maxLength={20}
                                                    title="Enter a valid phone number starting with +. Allowed: digits, spaces, dashes, parentheses"
                                                />
                                            </div>

                                            <div className={styles.formGroup}>
                                                <label className={`${styles.formLabel} ${styles.formTextareaLabel}`}>
                                                    <MessageOutlined className={styles.formIcon} />
                                                </label>
                                                <textarea
                                                    className={styles.formTextarea}
                                                    placeholder="Your Message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className={styles.submitButton}>
                                                    Send Message
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-4 mb-4">
                                <div className={styles.contactCard}>
                                    <div className={styles.contactSection}>
                                        <h3 className={styles.sectionTitle}>Contact Information</h3>
                                        <p className={styles.sectionDescription}>
                                            Reach out to us through any of these channels:
                                        </p>

                                        <div className={styles.contactInfoList}>
                                            <div className={styles.contactItem}>
                                                <div className={styles.contactIconWrapper}>
                                                    <MailOutlined className={styles.contactIcon} />
                                                </div>
                                                <div className={styles.contactDetails}>
                                                    <p className={styles.contactLabel}>Email</p>
                                                    <p className={styles.contactValue}>hello@woodfrog.tech</p>
                                                </div>
                                            </div>

                                            <div className={styles.contactItem}>
                                                <div className={styles.contactIconWrapper}>
                                                    <GlobalOutlined className={styles.contactIcon} />
                                                </div>
                                                <div className={styles.contactDetails}>
                                                    <p className={styles.contactLabel}>Main Office</p>
                                                    <p className={styles.contactValue}>
                                                        Regus - Pune, Tech Centre<br />
                                                        5th Floor, Tech Centre, Plot No.30<br />
                                                        Rajiv Gandhi MIDC Rd, Phase 1<br />
                                                        Hinjawadi Rajiv Gandhi Infotech Park<br />
                                                        Pune, Maharashtra 411057
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ContactForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    );
};

export default ContactPage;