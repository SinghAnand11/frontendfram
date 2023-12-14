import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import defaultUser from "../assest/defaultUser.png";

import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, selectLoggedInUser } from "../features/auth/AuthSlice";
import { selectCartItems } from "../features/cart/CartSlice";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector(selectLoggedInUser)
  const dispatch = useDispatch();
  const cartItems=useSelector(selectCartItems)
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logoutUserAsync())
  };

  const cartItemNumber = useSelector((state) => state.productSlice.cartItem);
  return (
    <header className="sticky shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/*desktop*/}
      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-12" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={logo} alt="" className="h-full" />
            {
              userData?.role==='admin' && <h6>Admin</h6>
            }
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">

          {
            userData &&           <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={"/"}>Home</Link>
            <Link to={"/menu/64716e9a9160b15d255423c7"}>Menu</Link>
          </nav>
          }


          {
          userData!==null ?(cartItems.length>0 && 
          
                    <div className="text-2xl text-slate-600 relative">
            <Link to={"/cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm  text-center">
                {cartItems.length}
              </div>
            </Link>
          </div>):''
          }

          <div className=" text-slate-600" onClick={handleShowMenu}>

            {
              userData && <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                <img src={defaultUser} style={{objectFit:"contain"}} width={'50px'} height={'50px'} className="h-full w-full" />

            </div>
            }

            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData?.role === 'admin' && (
                  <Link
                    to={"/newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {userData?(
                  <p
                    className="cursor-pointer text-black px-2"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}

                <nav className=" text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/64716e9a9160b15d255423c7"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile*/}
    </header>
  );
};

export default Header;
