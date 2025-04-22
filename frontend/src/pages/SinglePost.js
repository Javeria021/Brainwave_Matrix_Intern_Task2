import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../pages/Styles/SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setUpdatedTitle(res.data.title);
        setUpdatedContent(res.data.content);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      setPost(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate('/'); // Go back to home after deletion
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="single-post">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            rows="10"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className="author">By: {post.author}</p>
          <div className="post-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
