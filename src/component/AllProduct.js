import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

const AllProduct = ({ heading }) => {

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
    const [productData,setProuductData]=useState([])
    const [cleanedProudctDatat,setCleandedProductDatat]=useState([])

    const products=useSelector((state) => state.productSlice.productList);

    useEffect(()=>{
      setProuductData(products)
    },[products])


    useEffect(()=>{
      if(productData){
        const cledanded=productData?.filter(item => item !== undefined);
        setCleandedProductDatat(cledanded)
      }
    },[productData])

  const categoryList = [...new Set(productData.map((el) => el.category))];
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(cleanedProudctDatat);
  }, [cleanedProudctDatat]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = cleanedProudctDatat?.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  const loadingArrayFeature = new Array(10).fill(null);
  return (
    <div className=" my-5">
      <h2 className="font-bold text-2xl text-slate-800 mt-4">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                showSnack={()=>setState({...state,open:true})}
                  wholeProduct={el}
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  deleted={el.deleted}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Item added to Cart"
        key={state.Transition.name}
      />
    </div>
  );
};

export default AllProduct;
