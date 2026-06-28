import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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
