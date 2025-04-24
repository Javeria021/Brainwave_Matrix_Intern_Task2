import React, { useState } from 'react';
import './Styles/CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert("You must be logged in to create a blog post.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      alert(data.message || 'Blog post created!');
      setFormData({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Blog Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
