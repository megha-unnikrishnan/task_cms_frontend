import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar'; 

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { token } = useSelector((state) => state.auth); 
  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    is_active: true, // Track the user's active status
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/admin_view/edit-user/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  // Toggle the active status (block/unblock)
  const toggleActiveStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8000/admin_view/toggle-active-status/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include token in Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user status');
      }

      const data = await response.json();
      setUser({ ...user, is_active: !user.is_active }); // Toggle the status locally
      toast.success(data.message, { position: 'top-right', autoClose: 3000 });
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
    };

    try {
      const response = await fetch(`http://localhost:8000/admin_view/edit-user/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      toast.success('User updated successfully!', { position: 'top-right', autoClose: 3000 });
      navigate('/regular_lists'); 
    } catch (error) {
      toast.error(error.message, { position: 'top-right', autoClose: 3000 });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="p-6 w-full">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={user.full_name}
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Block/Unblock Button */}
          <div>
            <button
              type="button"
              onClick={toggleActiveStatus}
              className={`${
                user.is_active ? 'bg-red-500' : 'bg-green-500'
              } text-white px-4 py-2 rounded hover:bg-opacity-80`}
            >
              {user.is_active ? 'Block User' : 'Unblock User'}
            </button>
          </div>

          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUser;
