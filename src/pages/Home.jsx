import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../component/HomeCard";
import { useDispatch, useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import { selectUserInfo } from "../features/user/UserSlice";
import { getProductsAsync, selectProducts } from "../features/product/ProductSlice";
import Header from "../component/Header";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import { Button } from "@mui/material";



const Home = () => {

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  function GrowTransition(props) {
    return <Grow {...props} />;
  }
  

    const [state, setState] = React.useState({
      open: false,
      Transition: SlideTransition,
    });
  
    const handleClick = (Transition) => () => {
      setState({
        open: true,
        Transition:SlideTransition,
      });
    };
  
    const handleClose = () => {
      setState({
        ...state,
        open: false,
      });
    };


  const dispatch=useDispatch()
  const userInfo=useSelector(selectLoggedInUser)
  const productData = useSelector(selectProducts);

  useEffect(()=>{
    if(userInfo?.role){
      dispatch(getProductsAsync(userInfo.role))
    }
  },[userInfo])
  

const homeProductCartList = productData
  ?.filter(item => item !== undefined)
  .slice(1, 5);

  const homeProductCartListVegetables = homeProductCartList?.filter(
    (el) => el.category === "vegetable",
    []
  );
  
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  //Filter data Display

  return (
    <>
    {
    productData && (
      <>
      <Header/>
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className=" flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium  text-slate-900">Fast Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl  md:text-7xl font-bold py-4">
            Best ECommerce Website for
            <span className="text-red-600 "> Farmers</span>
          </h2>
          <p className="py-2 text-base ">
          The agricultural sector is considered as the backbone of the economy.
          However, the sector faces numerous challenges.One of the major problems is
          the inefficient distribution/supply chain system, which is the focus of this project.
          </p>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center ">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mt-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex  gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    showSnack={()=>setState({...state,open:true})}
                    deleted={el.deleted}
                    key={el._id + "vegetable"}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
    </div>
    <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Item added to Cart"
        key={state.Transition.name}
      />
    </>
      )
    }

    </>
  );
};

export default Home;
