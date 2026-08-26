import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Booking from "./pages/BookingPage";
import Contact from "./pages/ContactPage";
import Home from "./pages/Home";
import Login from "./pages/LoginModal";
import Register from "./pages/RegisterModal";
import TrainSearchResult from "./pages/TrainSearchResult";
import TrainDetails from "./pages/TrainDetails";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";

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
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "trainlist",
          element: <TrainSearchResult />,
        },
        {
          path: "booking-confirmation",
          element: <BookingConfirmationPage />,
        },
        {
          path: "train-details/:train_number",
          element: <TrainDetails />,
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
