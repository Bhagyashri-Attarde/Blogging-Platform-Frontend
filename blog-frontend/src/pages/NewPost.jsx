import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import Editor from '../components/Editor';
import styles from '../styles/NewPost.module.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/posts', { title, content });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className={styles.input}
  />
  <Editor content={content} setContent={setContent} className={styles.EditorWrapper} />
  <button type="submit" className={styles.button}>Publish</button>
</form>
  );
};

export default NewPost;
