import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }

    API.get('/posts/user/me')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Your Posts</h1>
      <Link to="/new" className={styles.createPostBtn}>Create New Post</Link>
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <h2>{post.title}</h2>
          <div className={styles.postActions}>
            <Link to={`/edit/${post.id}`} className={styles.editBtn}>Edit</Link>
            <button onClick={() => handleDelete(post.id)} className={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
