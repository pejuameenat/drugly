import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { RiCapsuleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";

const AuthShared = ({ children }: { children: ReactNode }) => {

  const currentPage = useLocation() 
  
  
  return (
    <section className="flex flex-col items-center justify-center w-full lg:min-h-screen">
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="rounded-full w-12 h-12 p-3 flex items-center justify-center bg-blue-600">
          <RiCapsuleLine size={26} className="text-white" />
        </div>
        <div className="text-center py-3">
          <span className="block font-medium">MedTracker</span>
          <span className=" block"> Your personal medication companion</span>
        </div>
      </div>
      <div className="pt-10 px-4 lg:p-0">
        <div className="bg-[#eee] w-full flex gap-1 rounded-full p-1 text-sm text-center -mb-4  relative z-index-5">
          <Link to="/" className={`w-full font-semibold rounded-full p-0.5 ${currentPage.pathname==='/'&&'bg-white'}`}>Login</Link>
          <Link to="/signup" className={`w-full font-semibold rounded-full p-0.5 ${currentPage.pathname==='/signup'&&'bg-white'}`}>Signup</Link>
        </div>

        {children}
      </div>
    </section>
  );
};

export default AuthShared;
