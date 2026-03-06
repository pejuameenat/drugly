// import { getToken } from "firebase/messaging";
// import { Bell } from "lucide-react";
// import { toast } from "sonner";
// import { messaging } from "../../Firebase/config";
// const EnableNotification = () => {
//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       toast.success("Permission granted.");
//       try {
//         const currentToken = await getToken(messaging, {
//           vapidKey: import.meta.env.VITE_MESSAGING_KEY,
//         });
//       } catch (error) {}
//     }
//   }

//   return (
//     <button onClick={requestPermission}>
//       return <Bell size={24} />;
//     </button>
//   );
// };

// export default EnableNotification;
