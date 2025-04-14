import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './InlineContactForm.module.css';
import { useTheme } from "../ThemeContext"; // Import the theme context

const { TextArea } = Input;

const InlineContactForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { isDarkTheme } = useTheme(); // Get the current theme

  const onFinish = (values: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      message.success('Your message has been sent successfully!');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`${styles.formContainer} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
              className={styles.formItem}
            >
              <Input 
                prefix={<span className={styles.inputIcon}>👤</span>}
                placeholder="First Name" 
                className={styles.input}
              />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
              className={styles.formItem}
            >
              <Input 
                prefix={<span className={styles.inputIcon}>👤</span>}
                placeholder="Last Name" 
                className={styles.input}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
          className={styles.formItem}
        >
          <Input 
            prefix={<span className={styles.inputIcon}>✉️</span>}
            placeholder="Email Address" 
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
          className={styles.formItem}
        >
          <Input 
            prefix={<span className={styles.inputIcon}>📱</span>}
            placeholder="Phone Number" 
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="organization"
          className={styles.formItem}
        >
          <Input 
            prefix={<span className={styles.inputIcon}>🏢</span>}
            placeholder="Organization" 
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="message"
          rules={[{ required: true, message: 'Please enter your message' }]}
          className={styles.formItem}
        >
          <TextArea
            placeholder="Type your message"
            rows={4}
            className={styles.textArea}
          />
        </Form.Item>

        <Form.Item className={styles.submitContainer}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className={styles.submitButton}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InlineContactForm;