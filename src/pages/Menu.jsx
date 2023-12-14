import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem, getProductByIdAsync, getProductsAsync, selectSelectedProduct, updateProductByIdAsync } from "../features/product/ProductSlice";
import Header from "../component/Header";
import { addToCartAsync, selectCartItems } from "../features/cart/CartSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Box, Button, Icon, IconButton, Stack, TextField } from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

const Menu = () => {
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
  const { filterby } = useParams();

  const [isEditing,setIsEditing]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productSlice.productList);

  useEffect(()=>{
    dispatch(getProductsAsync())
  },[])

  const [productDisplay,setProductDisplay]=useState()

  const cartItems=useSelector(selectCartItems)
  const user=useSelector(selectLoggedInUser)
  const selectedProduct=useSelector(selectSelectedProduct)


  useEffect(()=>{
    setProductDisplay(productData.filter((el) => el._id === filterby)[0])
  },[filterby])



  const handleAddCartProduct = (e) => {
    const data={product:filterby,user:user._id}
    dispatch(addToCartAsync(data))
    setState({...state,open:true})
  };

  const [editedState,setEditedState]=useState({
    name:"",
    price:"",
    description:"",
  })


  const handleEditClick=()=>{
    setEditedState({name:selectedProduct.name,price:selectedProduct.price,description:selectedProduct.description})
    setIsEditing(true)
  }

  const handleSaveClick=()=>{
    const data={...editedState,_id:filterby}
    console.log(data)
    dispatch(updateProductByIdAsync(data))
    setIsEditing(false)
    setEditedState({name:'',price:''})
  }


  useEffect(()=>{
    if(filterby){

      dispatch(getProductByIdAsync(filterby))
    }
  },[filterby])

  const handleOnChange=(e)=>{
    setEditedState({...editedState,[e.target.name]:e.target.value})
  }

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };
  return (
    <>
    <Header/>

    {
      selectedProduct && user &&
    <div  className="py-2 md:p-4">


      <div className="w-full max-w-4xl  m-auto md:flex  bg-white">
        <div className=" max-w-sm  overflow-hidden w-full p-5">
          <img
            src={selectedProduct.image}
            className="hover:scale-105 transition-all  h-full"
          />
        </div>
        <div className=" flex  flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {
              isEditing?(<TextField onChange={handleOnChange} name="name" value={editedState.name}></TextField>):(
                selectedProduct?.name
              )
            }
            {
              user.role==='admin'?( 
              // <Stack flexDirection={'row'}>
              isEditing===true?(
                
                <IconButton onClick={handleSaveClick} sx={{ml:3}} position='absolute' right={0} top={0}><CheckBoxIcon/></IconButton>
                ):(
                  <IconButton onClick={handleEditClick} sx={{ml:3}} position='absolute' right={0} top={0}><CreateOutlinedIcon/></IconButton>
              )
              ):("")

              // </Stack>
            }
            
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">
            {selectedProduct?.category}
          </p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500">€</span>

            {
              isEditing?(<TextField sx={{ml:1}} type="number" onChange={handleOnChange} name="price" value={editedState.price}></TextField>):(
                <span>{selectedProduct?.price}</span>

              )
            }
          </p>
          <div className=" flex gap-3">

            {user.role!=="admin" && 
            <>
                        {/* <button
              className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 min-w-[100px]"
              onClick={handleBuy}
            >
              {" "}
              Buy{" "}
            </button> */}
            <button
              onClick={handleAddCartProduct}
              className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 min-w-[100px]"
            >
              {" "}
              Add Cart
            </button>
            </>
            
            
            }

          </div>
          <div>
            {
              isEditing?(<TextField value={editedState.description} onChange={handleOnChange} name="description"></TextField>):(
                <>
                <p className="text-slate-600 font-medium">Description:</p>
                <p>{selectedProduct?.description}</p>
                </>
              )
            }
          </div>
        </div>
      </div>

      
      <AllProduct heading={"Related Product"} />
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Item added to Cart"
        key={state.Transition.name}
      />
    
    </div> 
    }
</>
  );
};

export default Menu;
