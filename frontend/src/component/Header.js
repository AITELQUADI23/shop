
import React, { useRef, useState } from "react";
import logo from "../images/logo.PNG";
import { Link, Outlet } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { Button, useDisclosure } from "@chakra-ui/react";
import SaidBarCard from "./SaidBarCard";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-full f-16 px-2 md:px-4 my-5">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-14">
            <img src={logo} className="h-full" alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-base md:text-lg">
          <nav className="flex gap-4 md:gap-7">
            <Link to="/contact">Contact</Link>
          </nav>
          <SaidBarCard isOpen={isOpen} onClose={onClose} btnRef={btnRef}   />
          <Button ref={btnRef} onClick={onOpen}  className="text-2xl text-slate-600 relative">
            <BsCartPlusFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-600 w-4 text-center text-sm rounded-full m-0 p-0 h-4">
              0
            </div>
          </Button>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-bold cursor-pointer flex flex-row">
              {user && (
                <p>
                  {user.lastName} {user.firstName}
                </p>
              )}
              {user ? (
                <div className="ml-2">
                  <img src={user.image} className="w-8 h-8 rounded-full" alt="User" />
                </div>
              ) : (
                <div >
                  <FaRegUserCircle className="w-6 h-8 rounded-full"/>
                </div>
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md cursor-pointer flex flex-col">
                <Link to="newproduct" className="whitespace-no-wrap">
                  New product
                </Link>
                {user ? (
                  <Link to="login" className="whitespace-no-wrap" onClick={handleLogout}>
                    LogOut
                  </Link>
                ) : (
                  <Link to="login" className="whitespace-no-wrap">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
