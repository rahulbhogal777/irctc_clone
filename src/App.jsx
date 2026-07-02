import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Booking from "./pages/BookingPage";
import Contact from "./pages/ContactPage";
import Home from "./pages/Home";
import Login from "./pages/LoginModal";
import Register from "./pages/RegisterModal";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "booking",
          element: <Booking />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "login",
          element: <Login isOpen={true} />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
