import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from './Sidebar'; // Import the Sidebar component
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import RegularUserList from './RegularUserList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useSelector((state) => state.auth); // Assuming isAdmin is part of the auth state
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Redirect to login if the user is not an admin
    if (!isAdmin) {
      navigate('/login');
    }

   
    
  }, [isAdmin, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Dashboard</h1>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Users Overview</h2>
            
              <ul>
                {users.length > 0 ? (
                  users.map((user) => (
                    <li key={user.id} className="border-b py-2">
                      <div className="flex justify-between items-center">
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No users found.</p>
                )}
              </ul>
            </div>

            {/* Posts Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Posts Overview</h2>
              <ul>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <li key={post.id} className="border-b py-2">
                      <div className="flex justify-between items-center">
                        <span>{post.title}</span>
                        <span>{post.status}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No posts found.</p>
                )}
              </ul>
            </div>

            {/* Admin Actions */}
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
