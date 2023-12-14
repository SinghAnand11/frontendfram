import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { selectCartItems } from "../features/cart/CartSlice";
import Header from "../component/Header";

const Cart = () => {
  const productCartItem = useSelector(selectCartItems);
  console.log(productCartItem);

  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const totalAmount=productCartItem.reduce((amount,item)=>item.product.price*item.quantity+amount,0)
  const totalItems=productCartItem.reduce((total,item)=>item.quantity+total,0)

  return (
    <>
    {productCartItem.length===0 && <Navigate to={'/'} replace={true}></Navigate>}
    <Header/>
      <div className="p-2 md:p-4">
        <h2 className="text-lg  md:text-2xl font-bold text-slate-600">
          {" "}
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items*/}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el.product._id}
                    id={el._id}
                    name={el.product.name}
                    image={el.product.image}
                    category={el.product.category}
                    qty={el.quantity}
                    total={el.product.price * el.quantity}
                    price={el.product.price}
                  />
                );
              })}
            </div>
            {/* total cart item */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className=" flex w-full py-2 text-lg border-b">
                <p>Total Qty:</p>
                <p className="ml-auto w-32 font-bold ">{totalItems}</p>
              </div>
              <div className=" flex w-full py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="ml-auto w-32 font-bold">
                  {" "}
                  <span className="text-red-500">€</span>
                  {totalAmount}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
