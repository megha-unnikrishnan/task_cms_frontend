import React, { useState } from 'react'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Define base URL for API requests
const BASE_URL = 'http://localhost:8000';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get token from Redux store or localStorage
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  
  // If no token, redirect to login page
  if (!token) {
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!title || !content) {
      setErrors({ form: 'Title and content are required' });
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
  
    try {
      const response = await fetch(`${BASE_URL}/posts/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the token to the headers
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('Post created successfully!');
        console.log(data);
       
        navigate('/user_dashboard');
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.detail || 'Failed to create post'}`);
        console.error('Error response:', errorData);
  
      
        if (errorData.code === 'token_not_valid' && errorData.messages[0].message === 'Token is invalid or expired') {
          toast.error('Your session has expired. Please log in again.');
          
          navigate('/login');
        }
      }
    } catch (error) {
      toast.error('An error occurred while creating the post');
      console.error('Error occurred:', error); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">
              Image 
            </label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>

        {/* Back button */}
        <button
          onClick={() => navigate('/user_dashboard')}
          className="mt-4 w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
