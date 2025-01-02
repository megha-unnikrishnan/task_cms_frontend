


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from './Sidebar'; // Import Sidebar component
import 'react-toastify/dist/ReactToastify.css';

const PostListusers = () => {
  const { token } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching posts', { position: 'top-right', autoClose: 3000 });
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleEdit = (postId) => {
    navigate(`/edit_post/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8000/admin_view/deleteuser/${postId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      toast.success('Post deleted successfully!', { position: 'top-right', autoClose: 3000 });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      toast.error('Error deleting post', { position: 'top-right', autoClose: 3000 });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <ToastContainer />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Post List</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Post Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Post Content</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Post Image</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img
                        src={`http://localhost:8000${post.author.profile_picture || '/default-profile-pic.jpg'}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-gray-700">{post.author.full_name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{post.title}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{post.content}</td>
                    <td className="px-6 py-4">
                      {post.image && (
                        <img
                          src={`http://localhost:8000${post.image}`}
                          alt="Post"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(post.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-600">
                    No posts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostListusers;

