import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster, toast} from 'sonner'
 import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Dashboard from "./Pages/dashboard";
import Sidebar from "./Pages/Sidebar";
import Settings from "./Pages/settings";
import Medications from "./Pages/medications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EnableNotification from "./modules/notification/enable-notification";
import { onMessage } from "firebase/messaging";
import { messaging } from "./Firebase/config";
import { useEffect } from 'react'


 
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

   useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      toast.info(payload.notification?.title ?? "Notification", {
        description: payload.notification?.body,
      });
    });

    return () => unsubscribe(); // cleans up on unmount
  }, []);



return (
  <main>
       <QueryClientProvider client={queryClient}>
       <Toaster richColors={ true} />
       <RouterProvider router={router}/>
       </QueryClientProvider>
       <EnableNotification/>
     </main>
   )
 }
 
 export default App