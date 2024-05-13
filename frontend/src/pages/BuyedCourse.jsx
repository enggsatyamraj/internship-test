import React, { useState, useEffect } from "react";

const Profile = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    // Remove the item from the cartItems array
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    // Update local storage to reflect the removal
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-[1280px] mx-auto">
      <h1 className="text-2xl font-semibold my-6">Cart Items</h1>
      {cartItems.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {cartItems.map((item, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-[100px] h-[100px] object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Instructor: {item.instructor}</p>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Profile;
