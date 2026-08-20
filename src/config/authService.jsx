import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

// Register new user with email and password
export const registerUserWithEmail = async (fullName, email, password) => {
  try {
    // Create the user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Update the user's display name
    await updateProfile(userCredential.user, { displayName: fullName });
    
    return userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    throw error;
  }
};

// Login existing user with email and password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    localStorage.setItem('userName', userCredential.user.displayName);
    return userCredential.user;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    throw error;
  }
};

// SignIn with google using popup
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    localStorage.setItem("userName", result.user.displayName);
    return result.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    throw error;
  }
};

// Logout the loggegin user
export const logout = async () => {
  try {
    localStorage.removeItem("userName");
    await signOut(auth);
    
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    throw error;
  }
};

// Listen for auth state changes
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
