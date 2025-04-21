import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../pages/Styles/SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      alert("Post deleted successfully");
      navigate('/');
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="single-post-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p className="author">Author: {post.author}</p>

      <div className="post-actions">
        <Link to={`/edit-post/${id}`} className="edit-btn">Edit</Link>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default SinglePost;
