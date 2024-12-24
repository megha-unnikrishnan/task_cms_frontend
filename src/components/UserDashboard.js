import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostList from './PostList';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.auth.fullName);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 1000,
    });
    navigate('/login'); // Redirect to login page
  };

  const handleCreatePost = () => {
    navigate('/create_post'); // Navigate to the post creation page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 fixed top-0 left-0 h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2"
              >
                Dashboard Home
              </button>
            </li>
            <li>
              <button
                onClick={handleCreatePost}
                className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2"
              >
                Create Post
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-auto">
        <ToastContainer />
        <header className="bg-white shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            {fullName && <h2 className="text-xl text-gray-600 mt-2">Welcome, {fullName}!</h2>}
          </div>
        </header>

        <section className="container mx-auto mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-700">Your Blogs</h3>
            <button
              onClick={handleCreatePost}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Create New Post
            </button>
          </div>

          {/* Post List */}
          <PostList />
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
