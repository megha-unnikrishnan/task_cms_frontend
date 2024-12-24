import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Sidebar from './Sidebar'; // Import Sidebar component 
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation

const RegularUserList = () => {
  const [regularUsers, setRegularUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { token } = useSelector((state) => state.auth); // Assuming you store the token in Redux
  const navigate = useNavigate(); // For navigation with useNavigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin_view/regular-users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Include token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setRegularUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        toast.error('Failed to load data', { position: 'top-right', autoClose: 3000 });
      }
    };

    fetchUsers();
  }, [token]);

  // Handle Edit action
  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`); // Navigate to the edit user page with the user's id
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar component */}
      <div className="flex-1 p-6">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Regular Users</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Profile Picture</th>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {regularUsers.length > 0 ? (
                regularUsers.map((user) => (
                  <tr key={user.email} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={`http://localhost:8000${user.profile_picture}`} // Ensure the image URL is correct
                        alt={user.full_name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{user.full_name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(user.id)} // Pass user id to the handleEdit function
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">No regular users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegularUserList;
