import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate()
  const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between">
        <img onClick={()=>navigate('/')} className="cursor-pointer" src={assets.logo} alt="Logo" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to='/applications'>Apply Job</Link>
            <p>|</p>
            <p className="max-sm:hidden">Welcome, {user.firstName+" "+user.lastName}</p>
            <UserButton/>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            <button onClick={e=> setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-500 text-white px-4 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
