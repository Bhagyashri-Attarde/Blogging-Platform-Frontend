
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) {
        setPosts([]);
        return;
      }
      try {
        const res = await API.get('/posts/user/me');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch user posts', err);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>My Posts</h1>
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
