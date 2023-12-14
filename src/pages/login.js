import React, { useEffect, useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { clearErrors, loginUserAsync, selectError, selectLoggedInUser } from "../features/auth/AuthSlice";
import Header from '../component/Header'
import Alert from '@mui/material/Alert';



const Login = () => {

  const [showAlert,setShowAlert]=useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error=useSelector(selectError)

  const loggedInUser=useSelector(selectLoggedInUser)
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  useEffect(()=>{
    return ()=>{
      dispatch(clearErrors())
    }
  },[])


  return (
    <>
    {loggedInUser && <Navigate to={'/'} replace={true}></Navigate>}
    <Header/>
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow m-auto">
          <img src={loginSignupImage} alt="" className="w-full" />
        </div>
        <form noValidate onSubmit={handleSubmit((data)=>{
          dispatch(loginUserAsync(data))
          console.log(data)
        })} className="w-full py-3 flex flex-col">
          {/* email */}
          <p htmlFor="email" style={{fontSize:"1.2rem"}}>Email</p>
          <input
            {...register("email",{required:"Email is required"})}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <p style={{marginBottom:"1rem",color:'red'}}>{errors.email?.message}</p> 
          
          {/* password */}
          <p htmlFor="password" style={{fontSize:"1.2rem"}}>Password</p>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password",{required:"Password is required"})}
              className=" w-full bg-slate-200 border-none outline-none "
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
            <p style={{marginBottom:"1rem",color:'red'}}>{errors.password?.message}</p> 
          <button type="submit" className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
          
          {error && <Alert sx={{mt:2}} severity="error">{error.message}</Alert>}
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
