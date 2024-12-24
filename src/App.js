import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import Register from './components/Register';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import PostEdit from './components/PostEdit';
import AdminDashboard from './components/adminDashboard';
import RegularUserList from './components/RegularUserList';
import AdminEditUser  from './components/adminEditUser';
import PostListusers from './components/PostListUsers';
import EditPostUser from './components/EditPostUser';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/user_dashboard" element={<UserDashboard />} />
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                <Route path="/regular_lists" element={<RegularUserList />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/edit_post/:pk" element={<EditPostUser />} />

                <Route path="/post_users" element={<PostListusers />} />
                <Route path="/create_post" element={<PostCreate />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/posts/:id/update" element={<PostEdit />} />

                <Route path="/admin/edit-user/:id" element={<AdminEditUser  />} />
            </Routes>
        </Router>
    );
};

export default App;
