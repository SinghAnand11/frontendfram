import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedInUser, selectisAuthChecked } from "./features/auth/AuthSlice";
import { getUserByIdAsync } from "./features/user/UserSlice";
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Cart, Home, Login, Menu, Newproduct, Signup } from "./pages";
import { Protected } from "./features/auth/components/Protected";
import { checkAuth } from "./features/auth/AuthApi";
import { getCartItemsByUserIdAsync } from "./features/cart/CartSlice";


function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectisAuthChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(()=>{
    if(user){
      dispatch(getCartItemsByUserIdAsync(user._id))
    }
  },[user])

  useEffect(() => {
    if(userChecked){
    }
  }, [userChecked]);

  return (
    <Router>
        {
          userChecked && <Routes>
           <Route exact path='/' element={<Protected><Home /></Protected>} />
          <Route exact path="/menu" element={<Protected><Menu /></Protected>} />
          <Route exact  path="/menu/:filterby" element={<Protected><Menu /></Protected>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/newproduct" element={<Protected><Newproduct /></Protected>} />
          <Route exact path="/cart" element={<Protected><Cart/></Protected>} />
          </Routes>
        }
         
    </Router>
  );
}

export default App;
