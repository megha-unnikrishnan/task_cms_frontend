import React, { useEffect, useState } from 'react';  
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:8000'; // Your Django API URL

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from Redux store or localStorage
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  // Initialize useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error('You need to be logged in to view posts');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request headers
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || 'Failed to fetch posts');
          setError(errorData.error || 'Failed to fetch posts');
          return;
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        toast.error('An error occurred while fetching posts');
        setError('An error occurred while fetching posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  // Navigate to post detail page
  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"> {/* Set to 3 columns */}
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-md bg-white">
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src={post.author.profile_picture ? `${BASE_URL}${post.author.profile_picture}` : '/default-profile.png'}
                  alt={post.author.full_name}
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <p className="text-sm font-semibold text-gray-900">{post.author.full_name}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image ? `${BASE_URL}${post.image}` : '/default-image.png'}
                  alt={post.title}
                  className="w-full h-56 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => handlePostClick(post.id)}  // Navigate to post detail on click
                />
              )}

              {/* Post Title */}
              <h3
                className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer"
                onClick={() => handlePostClick(post.id)}  // Navigate to post detail on click
              >
                {post.title}
              </h3>

              {/* Post Content */}
              <p className="text-gray-700 text-base mb-4">
                {truncateContent(post.content)} 
                {post.content.length > 150 && (
                  <button 
                    onClick={() => toast.info(post.content)} 
                    className="text-blue-600 hover:text-blue-800 font-semibold">
                    Read More
                  </button>
                )}
              </p>

              {/* Optional: Add more post details or actions */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
