
import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const postsRef = useRef(null);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputFocus = () => {
    postsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeContainer}>
        {/* Site Name */}
        <motion.h1
          className={styles.siteTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blogging Platform
        </motion.h1>

        {/* Tagline */}
        <motion.div
          className={styles.tagline}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Publish your passions, your way</h2>
          <p>Create a unique and beautiful blog easily.</p>
        </motion.div>

        {/* Search */}
        <motion.div
          className={styles.searchBarWrapper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            className={styles.searchInput}
          />
        </motion.div>

        {/* Posts */}
        <div ref={postsRef}>
          <AnimatePresence>
            {filteredPosts.length === 0 ? (
              <motion.p
                className={styles.noResults}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No matching posts found.
              </motion.p>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className={styles.postCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }}
                >
                  <h2>
                    <Link to={`/post/${post.id}`} className={styles.postTitle}>
                      {post.title}
                    </Link>
                  </h2>
                  <p
                    className={styles.postExcerpt}
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 150) + "...",
                    }}
                  />
                  <div className={styles.postMeta}>
                    <span>
                      By <strong>{post.author?.username || "Unknown"}</strong>
                    </span>
                    <span> | </span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
