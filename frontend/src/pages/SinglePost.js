import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(res.data);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        navigate("/"); // 🟢 Navigate after delete
      } catch (err) {
        console.log("Delete error:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const isAuthor =
    user?.username === post?.author?.username ||
    user?.username === post?.author;

  return (
    <div className="single-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By: {post.author?.username || post.author}</p>

      {isAuthor && (
        <div className="post-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
