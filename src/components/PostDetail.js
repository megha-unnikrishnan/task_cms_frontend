// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FiMoreHorizontal } from 'react-icons/fi';
// import {  ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const BASE_URL = 'http://localhost:8000';

// const PostDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(0);

//   const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       toast.error('You need to be logged in to view post details');
//       return;
//     }

//     const fetchPostDetail = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/posts/${id}/`, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           toast.error(errorData.error || 'Failed to fetch post details');
//           setError(errorData.error || 'Failed to fetch post details');
//           return;
//         }

//         const data = await response.json();
//         console.log("data",data);
        
//         setPost(data);
//         setLiked(data.liked);
//         setLikesCount(data.likes_count);
//         setComments(data.comments);
//         setLoading(false);
//       } catch (err) {
//         toast.error('An error occurred while fetching post details');
//         setError('An error occurred while fetching post details');
//         setLoading(false);
//       }
//     };

//     fetchPostDetail();
//     fetchComments(); 
//     fetchLikes();
//   }, [id, token]);
//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${id}/comments/`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         toast.error(errorData.error || 'Failed to fetch comments');
//         return;
//       }
  
//       const data = await response.json();
//       console.log("Fetched comments:", data); // Log the fetched comments
//       setComments(data);
//     } catch (err) {
//       console.error('Error fetching comments:', err); // Log the error for debugging
//       toast.error('An error occurred while fetching comments');
//     }
//   };
  
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!comment) {
//       toast.error('Please enter a comment');
//       return;
//     }
  
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${id}/comments/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: comment }),
//       });
  
//       if (response.ok) {
//         setComment('');
//         toast.success('Comment added successfully');
//         // Fetch updated comments
//         fetchComments();
//       } else {
//         toast.error('Failed to post comment');
//       }
//     } catch (error) {
//       console.error('Error posting comment:', error);
//       toast.error('An error occurred while posting the comment');
//     }
//   };
  
  
//   const handleDeletePost = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${id}/delete/`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         toast.success('Post deleted successfully');
//         navigate('/user_dashboard');
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.error || 'Failed to delete post');
//       }
//     } catch (err) {
//       toast.error('An error occurred while deleting the post');
//     }
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleEditClick = () => {
//     navigate(`/posts/${id}/update`);
//   };

//   const handleLike = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${id}/likes/`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setLiked(data.liked);
//         setLikesCount(data.likes_count);
//         toast.success(data.message);
//       } else {
//         toast.error('Failed to update like status');
//       }
//     } catch (err) {
//       toast.error('An error occurred while updating like status');
//     }
//   };



//   const fetchLikes = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${id}/likes/`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         toast.error(errorData.error || 'Failed to fetch like status');
//         return;
//       }

//       const data = await response.json();
//       setLiked(data.liked);
//       setLikesCount(data.likes_count);
//     } catch (err) {
//       toast.error('An error occurred while fetching like status');
//     }
//   };

//   if (loading) return <div>Loading post details...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//           <ToastContainer />
//       {post && (
//         <div className="border p-6 rounded-lg shadow-md bg-white">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h3>
//           <div className="flex items-center mb-4">
//             <img
//               src={post.author.profile_picture ? `${BASE_URL}${post.author.profile_picture}` : '/default-profile.png'}
//               alt={post.author.full_name}
//               className="w-10 h-10 rounded-full object-cover mr-4"
//             />
//             <p className="text-sm font-semibold text-gray-900">{post.author.full_name}</p>
//             <div className="ml-auto relative">
//               <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
//                 <FiMoreHorizontal className="text-xl" />
//               </button>
//               {menuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//                   <ul>
//                     <li onClick={handleEditClick} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</li>
//                     <li onClick={handleDeletePost} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <p className="text-gray-700 text-base mb-4">{post.content}</p>
//           {post.image && (
//             <img
//               src={post.image ? `${BASE_URL}${post.image}` : '/default-image.png'}
//               alt={post.title}
//               className="w-full h-56 object-cover rounded-lg mb-4"
//             />
//           )}
//           <div className="flex items-center mb-4">
//             <button onClick={handleLike} className={`text-xl ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}>
//               ❤️ {liked ? 'Unlike' : 'Like'}
//             </button>
//             <span className="ml-2 text-sm">{likesCount} Likes</span>
//           </div>
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
//             <form onSubmit={handleCommentSubmit} className="mt-2">
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Add a comment..."
//                 className="w-full p-2 border rounded-md text-sm text-gray-700"
//               />
//               <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Post Comment</button>
//             </form>
//             <div className="mt-6 space-y-4">
//   {comments && comments.length > 0 ? (
//     comments.map((comment) => (
//       <div key={comment.id} className="flex items-start space-x-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-200">
//         {/* Profile Picture */}
//         <img
//           src={comment.author.profile_picture ? `${BASE_URL}${comment.author.profile_picture}` : '/default-profile.png'}
//           alt={comment.author.full_name}
//           className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
//         />
//         <div className="flex-1">
//           {/* Author's Name */}
//           <p className="font-semibold text-lg text-gray-900">{comment.author.full_name}</p>
//           {/* Comment Content */}
//           <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
//           {/* Time/Date (Optional) */}
//           <p className="text-xs text-gray-500 mt-2">{comment.created_at || 'Just now'}</p>
//         </div>
//       </div>
//     ))
//   ) : (
//     <p className="text-gray-500 text-sm">No comments yet</p>
//   )}
// </div>


//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostDetail;




import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

const BASE_URL = 'http://localhost:8000';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('You need to be logged in to view post details');
      return;
    }

    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/posts/${id}/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || 'Failed to fetch post details');
          setError(errorData.error || 'Failed to fetch post details');
          return;
        }

        const data = await response.json();
        setPost(data);
        setLiked(data.liked);
        setLikesCount(data.likes_count);
        setComments(data.comments);
        setLoading(false);
      } catch (err) {
        toast.error('An error occurred while fetching post details');
        setError('An error occurred while fetching post details');
        setLoading(false);
      }
    };

    fetchPostDetail();
    fetchComments(); 
    fetchLikes();
  }, [id, token]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/comments/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to fetch comments');
        return;
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      toast.error('An error occurred while fetching comments');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/comments/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment }),
      });

      if (response.ok) {
        setComment('');
        toast.success('Comment added successfully');
        fetchComments();
      } else {
        toast.error('Failed to post comment');
      }
    } catch (error) {
      toast.error('An error occurred while posting the comment');
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Post deleted successfully');
        navigate('/user_dashboard');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete post');
      }
    } catch (err) {
      toast.error('An error occurred while deleting the post');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEditClick = () => {
    navigate(`/posts/${id}/update`);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/likes/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setLikesCount(data.likes_count);
        toast.success(data.message);
      } else {
        toast.error('Failed to update like status');
      }
    } catch (err) {
      toast.error('An error occurred while updating like status');
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${id}/likes/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to fetch like status');
        return;
      }

      const data = await response.json();
      setLiked(data.liked);
      setLikesCount(data.likes_count);
    } catch (err) {
      toast.error('An error occurred while fetching like status');
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading post details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <ToastContainer />
      {post && (
        <div className="border p-6 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h3>
          <div className="flex items-center mb-4">
            <img
              src={post.author.profile_picture ? `${BASE_URL}${post.author.profile_picture}` : '/default-profile.png'}
              alt={post.author.full_name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <p className="text-sm font-semibold text-gray-900">{post.author.full_name}</p>
            <div className="ml-auto relative">
              <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
                <FiMoreHorizontal className="text-xl" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <ul>
                    <li onClick={handleEditClick} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</li>
                    <li onClick={handleDeletePost} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 text-base mb-4">{post.content}</p>
          {post.image && (
            <img
              src={post.image ? `${BASE_URL}${post.image}` : '/default-image.png'}
              alt={post.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
          )}
          <div className="flex items-center mb-4">
            <button onClick={handleLike} className={`text-xl ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}>
              ❤️ {liked ? 'Unlike' : 'Like'}
            </button>
            <span className="ml-2 text-sm">{likesCount} Likes</span>
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
            <form onSubmit={handleCommentSubmit} className="mt-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-md text-sm text-gray-700 mb-2"
              />
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Post Comment</button>
            </form>
            <div className="mt-6 space-y-4">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <img
                      src={comment.author.profile_picture ? `${BASE_URL}${comment.author.profile_picture}` : '/default-profile.png'}
                      alt={comment.author.full_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-900">{comment.author.full_name}</p>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{comment.created_at || 'Just now'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;

