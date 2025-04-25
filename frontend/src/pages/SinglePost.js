import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import '../pages/Styles/SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(res.data);
        console.log("Fetched post:", res.data);
      } catch (error) {
        console.log("Error fetching post:", error);
      }
    };
    fetchPost();

    // ✅ Show success message if redirected after edit
    if (location.state?.updated) {
      setMessage("✅ Post updated successfully!");
      window.history.replaceState({}, document.title); // Clear state to prevent repeat

      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [id, location.state]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        navigate("/");
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
    user?.username === post?.author?.name ||
    user?.username === post?.author;

  return (
    <div className="single-post">
      {/* ✅ Success message */}
      {message && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
            border: "1px solid #c3e6cb",
            maxWidth: "600px",
          }}
        >
          {message}
        </div>
      )}

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
