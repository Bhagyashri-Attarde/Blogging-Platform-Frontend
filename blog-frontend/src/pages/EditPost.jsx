import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';
import Editor from '../components/Editor';
import styles from '../styles/EditPost.module.css';
import { toast } from 'react-toastify';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/posts/${id}`, { title, content });
    toast.success('Post updated successfully!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.inputField}
      />
      <div className={styles.editorWrapper}>
        <Editor content={content} setContent={setContent} />
      </div>
      <button type="submit" className={styles.submitButton}>Update</button>
    </form>
  );
};

export default EditPost;
