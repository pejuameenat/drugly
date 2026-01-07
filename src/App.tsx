import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from 'sonner'
 import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Pages/Sidebar";
import Settings from "./Pages/settings";
import Medications from "./Pages/medications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

 
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
  const queryClient = new QueryClient();

 

return (
  <main>
       <QueryClientProvider client={queryClient}>
       <Toaster richColors={ true} />
       <RouterProvider router={router}></RouterProvider>
       </QueryClientProvider>
     </main>
   )
 }
 
 export default App