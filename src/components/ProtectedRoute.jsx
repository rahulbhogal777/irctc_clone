import { Children } from "react";
import { useAuth } from "../context/authContext";

// component to protect route that requires authentication      
const protectedRouter = ({ Children }) => {
    //get auth state  from authContext
    const { currentUser, loading } = useAuth;

    if (loading) {
        return <div>Loading...</div>
    }

    // if no user logged in, redirect to the home page
    if(!currentUser){}
}