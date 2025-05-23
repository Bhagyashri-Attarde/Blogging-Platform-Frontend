import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import styles from '../styles/PostDetail.module.css';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <span className={styles.author}>By {post.author || 'Unknown Author'}</span>
        <span className={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className={styles.tags}>
          {post.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      )}
      <div
  className={styles.content}
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

    </div>
  );
};

export default PostDetail;
