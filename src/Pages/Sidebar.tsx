import { Outlet } from "react-router-dom"
import Nav from "../modules/navbar/nav"
import EnableNotification from '../modules/notification/enable-notification'

const Sidebar = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <EnableNotification />
    </>
  )
}

export default Sidebar