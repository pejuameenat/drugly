import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from 'sonner'
 import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Pages/Sidebar";
import Settings from "./Pages/settings";
import Medications from "./Pages/medications";

 
const App = () => {
   
   const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
     },
      {
      path: "/signup",
      element: <SignUp />,
     },
     {
       path: "/",
       element:<Sidebar/>,
       children: [
          {path: "/dashboard", element: <Dashboard /> },
          {path: "/medications", element: <Medications /> },
          {path: "/settings", element: <Settings /> }
        ]
      }
   ])
  
  
   return (
     <main>
       <Toaster richColors={ true} />
       <RouterProvider router={router}></RouterProvider>
     </main>
   )
 }
 
 export default App