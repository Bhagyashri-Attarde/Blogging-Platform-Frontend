
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">Home</Link>
      </div>

      <div className={styles.right}>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
           <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
           
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
