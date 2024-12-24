import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
            'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
  
      toast.success('Post deleted successfully!', { position: 'top-right', autoClose: 3000 });
      setPosts(posts.filter(post => post.id !== postId)); // Remove deleted post from state
    } catch (error) {
      toast.error('Error deleting post', { position: 'top-right', autoClose: 3000 });
    }
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Post List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Post Title</th>
              <th className="px-4 py-2 text-left">Post Content</th>
              <th className="px-4 py-2 text-left">Post Image</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.id} className="border-b">
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <img
                      src={`http://localhost:8000${post.author.profile_picture || '/default-profile-pic.jpg'}`} // Full URL for profile picture
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span>{post.author.full_name}</span>
                  </td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.content}</td>
                  <td className="px-4 py-2">
                    {post.image && (
                      <img
                        src={`http://localhost:8000${post.image}`} // Full URL for post image
                        alt="Post"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">No posts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostListusers;
