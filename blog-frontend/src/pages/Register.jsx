import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import styles from '../styles/Register.module.css'; // Import the CSS module

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', { username, email, password });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Register</button>
    </form>
  );
};

export default Register;
