import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/BookingPage";
import Contact from "./pages/ContactPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: "booking",
          Component: Booking
        },
        {
          path: "contact",
          Component: Contact
        }
      ]

    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
