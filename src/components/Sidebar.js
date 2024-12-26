import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 1000,
    });
    navigate('/login'); // Redirect to login page
  };
  return (
    <div className="w-64 bg-indigo-600 text-white min-h-screen flex flex-col">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <div className="flex-grow">
        <ul className="space-y-4 p-4">
          <li>
            <Link to="/admin_dashboard" className="hover:text-indigo-200">Dashboard</Link>
          </li>
          <li>
            <Link to="/regular_lists" className="hover:text-indigo-200">Manage Users</Link>
          </li>
          <li>
            <Link to="/post_users" className="hover:text-indigo-200">Manage Posts</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="hover:text-indigo-200">Settings</Link>
          </li>
        </ul>
      </div>
      <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
    </div>
  );
};

export default Sidebar;
