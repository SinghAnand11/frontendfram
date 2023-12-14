import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, updateProductByIdAsync } from "../features/product/ProductSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { addToCartAsync } from "../features/cart/CartSlice";

const CardFeature = ({showSnack, wholeProduct,image, name, price, category, loading, id ,deleted}) => {
  
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    showSnack()
    const data={user:user._id,product:id}
    dispatch(addToCartAsync(data))
  };
  const user=useSelector(selectLoggedInUser)
  const handleDelete=()=>{
    // const data={...wholeProduct,[deleted]:true}
    const data={_id:id,deleted:deleted?false:true}
    console.log(data)
    dispatch(updateProductByIdAsync(data))
  };
  return (
    <div style={{opacity:deleted?0.6:1}} className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg  py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">€</span>
              <span>{price}</span>
            </p>
          </Link>
          {
            user?.role!=='admin' &&   <button
            className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 w-full"
            onClick={handleAddCartProduct}
          >
            {" "}
            Add Cart
          </button>
          }


          {user.role==='admin' && 
          <button
            className="bg-red-500 py-1 mt-2 rounded hover:bg-red-600 w-full"
            onClick={handleDelete}
          > {deleted?"Un-Delete":"Delete Item"}
            </button>
          }
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
