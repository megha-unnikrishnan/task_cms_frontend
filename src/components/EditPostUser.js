import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPostUser = () => {
  const { pk } = useParams();  // Get the post ID from the URL
  const { token } = useSelector((state) => state.auth);  // Get the authentication token from Redux state
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/admin_view/posts-users/${pk}/update/`, {  // Fetch the specific post by ID
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching post details', { position: 'top-right', autoClose: 3000 });
        setLoading(false);
      }
    };

    fetchPost();
  }, [pk, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = { title, content };

    try {
      const response = await fetch(`http://localhost:8000/admin_view/posts-users/${pk}/update/`, {
        method: 'PATCH',  // Use PATCH for partial updates
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const data = await response.json();
      toast.success('Post updated successfully!', { position: 'top-right', autoClose: 3000 });
      navigate(`/post_users`);  // Redirect to the updated post's page
    } catch (error) {
      toast.error('Error updating post', { position: 'top-right', autoClose: 3000 });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${pk}`)}  // Cancel and go back to the post
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostUser;
