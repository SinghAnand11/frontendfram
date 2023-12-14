import React, { useEffect, useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { imagetoBase64 } from "../utility/imagetoBase64";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoggedInUser, signupUserAsync } from "../features/auth/AuthSlice";
import Header from "../component/Header";
import { Alert } from "@mui/material";

const Signup = () => {

  const [welcome,setWelcome]=useState(false)

  const [profileImage, setProfileImage] = useState("");
  const loggedInUser=useSelector(selectLoggedInUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const error=useSelector(selectError)
  console.log(error)

  useEffect(()=>{
    console.log(error)
  },[error])

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleUploadProfileImages = async (e) => {
    const selected=await imagetoBase64(e.target.files[0])
    console.log(selected)
    setProfileImage(selected)
  };

  const onSubmit = (data) => {
    const finalData={...data,image:profileImage}
    delete finalData.confirmPassword
    console.log(finalData)
    dispatch(signupUserAsync(finalData))
  };

  useEffect(()=>{
    if(loggedInUser){
      setTimeout(() => {
        navigate("/")
    }, 2000);
    setWelcome(true)
    }
  },[loggedInUser])

  return (
    <>
    <Header/>
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4">
        <form
        style={{display:'flex',rowGap:'.7rem'}}
          className="w-full py-3 flex flex-col"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
          <label style={{fontSize:"1.2rem"}} htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            {...register("firstName", { required: "First Name is required" })}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          {errors.firstName && <p style={{marginBottom:'.5rem',color:"red"}}>{errors.firstName.message}</p>}
          </div>

          <div>
            <label style={{fontSize:"1.2rem"}} htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            {...register("lastName", { required: "Last Name is required" })}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          {errors.lastName && <p style={{marginBottom:'.5rem',color:"red"}}>{errors.lastName.message}</p>}
          </div>


          <div>
                      <label style={{fontSize:"1.2rem"}} htmlFor="email">Email</label>
          <input
            type={"email"}
            {...register("email", { required: "Email is required" ,pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"Please enter a valid email"}})}
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <p style={{marginBottom:'.5rem',color:"red"}}>{errors.email?.message}</p>
          </div>

          <div>
            <label style={{fontSize:"1.2rem"}} htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required",pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,message:"Weak Password"},minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long."
                }})}
                className="w-full bg-slate-200 border-none outline-none"
              />
              <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          {errors.password && <p style={{marginBottom:'.5rem',color:"red"}}>{errors.password.message}</p>}
          </div>

          <div>



          <label style={{fontSize:"1.2rem"}} htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords don't match",
              })}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {errors.confirmPassword && <p style={{marginBottom:'.5rem',color:"red"}}>{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium text-center py-1 rounded-full mt-4"
          >
            Sign up
          </button>
          {
            error && <Alert severity="error">{error.message}</Alert>
          }
          {
            welcome && <Alert severity="success">Welcome {loggedInUser.firstName}!</Alert>
          }
          
        </form>
        <p className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Signup;
