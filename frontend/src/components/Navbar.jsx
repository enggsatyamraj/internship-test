import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux store

const Navbar = () => {
  // const cartItems = useSelector(state => state.cart.items); // Access cart items from Redux store

  return (
    <div className="w-[100%] px-3">
      <div className="max-w-[1280px] py-3 mx-auto flex justify-between items-center">
        <Link to={"/"} className="md:text-3xl text-2xl font-bold tracking-wide">
          Course
        </Link>
        <div className="flex gap-5 items-center">
          <Link to={"/"} className="">
            Courses
          </Link>
          <Link to={"/profile"} className="">
            <FaShoppingCart size={17}/>
            {/* <span className="text-sm ml-1">{cartItems.length}</span> Display the length of cart items */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
