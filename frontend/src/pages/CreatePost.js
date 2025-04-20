import React, { useState } from 'react';
import './styles/CreatePost.css';

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

    try {
      const res = await fetch('http://localhost:5000/api/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || 'Blog post created!');
      setFormData({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Something went wrong!');
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
