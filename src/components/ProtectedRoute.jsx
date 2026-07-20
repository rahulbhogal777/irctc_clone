import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

// component to protect route that requires authentication
const ProtectedRoute = ({ children }) => {
  // get auth state from authContext
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // if no user logged in, redirect to the home page
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // not loading, user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
