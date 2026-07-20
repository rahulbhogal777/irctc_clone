import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState } from "../config/authService.jsx";

// create auth context
const AuthContext = createContext();

// custom hook for authentication context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // state to store the current authentication user
  const [currentUser, setCurrentUser] = useState(null);
  // tracking the loading status while checking for authentication
  const [loading, setLoading] = useState(true);

  // set the currentuser
  useEffect(() => {
    //subscribe to authentication state changes
    const unsubscribe = observeAuthState((user) => {
      setCurrentUser(user); // set the authenticate the user
      setLoading(false); // set loading to false once the user is set
    });

    // cleanup function to unsubscribe when component unmounts
    return unsubscribe;
  }, []);

  //provide authenication state and loading status to the whole app
  const value = {
    currentUser, //current user detail if logged in else null
    loading, // specify whether the auth state is still being changed
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
