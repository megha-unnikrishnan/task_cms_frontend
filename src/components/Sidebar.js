import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
      <div className="p-4 border-t border-indigo-700">
        <Link to="/login" className="hover:text-indigo-200">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
