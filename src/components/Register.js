import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Invalid email format';
    }

    // Full Name validation (only letters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!fullName) {
      formErrors.fullName = 'Full Name is required';
    } else if (!nameRegex.test(fullName)) {
      formErrors.fullName = 'Full Name must contain only letters';
    }

    // Date of Birth validation (not in the future)
    if (!dob) {
      formErrors.dob = 'Date of Birth is required';
    } else if (new Date(dob) > new Date()) {
      formErrors.dob = 'Date of Birth cannot be in the future';
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      formErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone = 'Phone number must be 10 digits';
    }

    // Password validation
    if (!password) {
      formErrors.password = 'Password is required';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    // Profile Picture validation (only image files)
    if (profilePicture && !profilePicture.type.startsWith('image')) {
      formErrors.profilePicture = 'Profile picture must be an image file';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('full_name', fullName);
      formData.append('dob', dob);
      formData.append('confirm_password', confirmPassword);
      formData.append('phone', phone);
      if (profilePicture) formData.append('profile_picture', profilePicture);
      dispatch(registerUser(formData));
    } else {
      toast.error('Please fix the errors before submitting.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Registration successful! Redirecting...', {
        position: 'top-right',
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
    }

    if (status === 'failed' && error) {
      if (error.email) {
        toast.error(`Error: ${error.email[0]}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Registration failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  }, [status, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-2 text-white font-semibold rounded-lg ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
          <a></a>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
