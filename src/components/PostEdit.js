import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const BASE_URL = 'http://localhost:8000'; // Your Django API URL

const PostEdit = () => {
  const { id } = useParams();  // Get the post ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate hook instead of useHistory
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State for the uploaded image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/posts/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || 'Failed to fetch post details');
          setError(errorData.error || 'Failed to fetch post details');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        toast.error('An error occurred while fetching post details');
        setError('An error occurred while fetching post details');
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id, token]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image); // Append the image if it's selected
  
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('Post updated successfully');
        navigate('/user_dashboard'); // Redirect to the user dashboard after successful update
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update post');
      }
    } catch (err) {
      toast.error('An error occurred while updating the post');
      console.error('Error during update:', err);  // Log any errors that occur
    }
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  if (loading) return <div className="text-center">Loading post details...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-md">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Edit Post</h3>
      {post && (
        <form onSubmit={handleUpdatePost} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {post.image && (
              <div className="mt-2">
                <img
                  src={`${BASE_URL}${post.image}`}  // Ensure the image path is correct
                  alt="Post"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Post
          </button>
        </form>
      )}
    </div>
  );
};

export default PostEdit;
