import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!user || !user.token) {
      alert("You must be logged in to edit a post.");
      return navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate(`/posts/${id}`, { state: { updated: true } });
    } catch (err) {
      console.log("Update error:", err);
      alert("Update failed. Make sure you are authorized.");
    }
  };

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
