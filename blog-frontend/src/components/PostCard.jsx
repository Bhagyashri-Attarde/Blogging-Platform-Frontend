import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => (
  <div className={styles.postCard}>
    <h2>{post.title}</h2>
    <p>{post.content.substring(0, 100)}...</p>
    <p className={styles.meta}>
      <em>
        By <strong>{post.author?.username || 'Unknown'}</strong> |{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </em>
    </p>
    <Link to={`/post/${post.id}`}>Read More</Link>
  </div>
);

export default PostCard;
