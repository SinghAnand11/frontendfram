import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkAuthAsync, selectLoggedInUser, selectisAuthChecked } from "./features/auth/AuthSlice";
import { Cart, Home, Login, Menu, Newproduct, Signup } from "./pages";
import { Protected } from "./features/auth/components/Protected";
import { getCartItemsByUserIdAsync } from "./features/cart/CartSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectisAuthChecked);

  useEffect(() => {
    // Effect to check authentication status
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    // Effect to fetch cart items when user is available
    if (user) {
      dispatch(getCartItemsByUserIdAsync(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    // Effect for additional logic when userChecked changes
    if (userChecked) {
      // Your code here if needed
    }
  }, [userChecked]);

  // JSX for the component structure
  return (
    <Router>
      {userChecked && (
        <Routes>
          <Route path='/' element={<Protected><Home /></Protected>} />
          <Route path="/menu" element={<Protected><Menu /></Protected>} />
          <Route path="/menu/:filterby" element={<Protected><Menu /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newproduct" element={<Protected><Newproduct /></Protected>} />
          <Route path="/cart" element={<Protected><Cart /></Protected>} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
