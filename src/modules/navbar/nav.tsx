import { RiCapsuleLine } from "react-icons/ri";
import { FiHome, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import UniversalOverlay from "../../components/layout/universal-overlay";
import { auth } from "../../Firebase/config";
import { signOut } from "firebase/auth";

console.log(auth)
const Nav = () => {
  const currentLink = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  
  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");  
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <nav className="lg:hidden flex items-center gap-4 fixed top-0 left-0 right-0 bg-white shadow-sm p-3">
        <button type="button" onClick={() => setIsOpen(true)}>
          <FiMenu />
        </button>
        <div className="flex gap-1 items-center    px-2">
          <RiCapsuleLine size={30} className="text-blue-600" />
          MedTracker
        </div>
      </nav>
      {/* sidebar */}
      <UniversalOverlay isOpen={isOpen} setIsOpen={setIsOpen}/>
        <aside
          className={`border-r border-[#BDBDBD] bg-white w-52 fixed left-0 top-0 bottom-0 z-5 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
        >
          <nav className="flex flex-col justify-between h-full ">
            <div className="flex justify-between items-center py-4 border-b border-[#BDBDBD] px-2 ">
              <menu className="flex gap-1 items-center">
                <RiCapsuleLine size={24} className="text-blue-600" />
                MedTracker
              </menu>
              <button
                type="button"
                className="lg:hidden"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="p-2 grow">
              <ul className="flex flex-col gap-1">
                <li
                  className={`flex items-center gap-1 py-3 hover:bg-gray-50 px-2 rounded-md ${
                    currentLink === "/dashboard" && "text-blue-600 bg-[#e8f3ff]"
                  }`}
                >
                  <FiHome />
                  <Link to="/dashboard" className="w-full">
                    {" "}
                    Dashboard
                  </Link>
                </li>
                <li
                  className={`flex items-center gap-1 py-3 hover:bg-gray-50 px-2 rounded-md ${
                    currentLink === "/medications" &&
                    "text-blue-600 bg-[#e8f3ff]"
                  }`}
                >
                  {" "}
                  <RiCapsuleLine />
                  <Link to="/medications" className="w-full">
                    Medications
                  </Link>
                </li>
                <li
                  className={`flex items-center gap-1 py-3 hover:bg-gray-50 px-2 rounded-md ${
                    currentLink === "/settings" && "text-blue-600 bg-[#e8f3ff]"
                  }`}
                >
                  <FiSettings />
                  <Link to="/settings" className="w-full">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex justify-between border-t  border-[#bdbdbd] py-3 px-2">
              <div className="grow text-[12px]">
              <strong className="block">{auth.currentUser?.displayName }</strong>
              <span className="text-[#bdbdbd]">{ auth.currentUser?.email}</span>
              </div>
              <button
                type="button"
                className="hover:bg-gray-100 px-2 py-0.5 rounded-md text-red-500" onClick={handleLogout}
              >
                <FiLogOut />
              </button>
            </div>
          </nav>
        </aside>
    </div>
  );
};

export default Nav;
