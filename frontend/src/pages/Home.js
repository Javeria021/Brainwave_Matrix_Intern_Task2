import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data.posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><b>Author ID:</b> {post.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
