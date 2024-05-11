import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Loader from './Loader';
import Error from './Error';

const Home = () => {

  const [product,setProduct]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(() => {
    try {
      const fetch=async()=>{
        const {data}=await axios.get("https://fakestoreapi.com/products");
        setProduct(data);
        setLoading(false);
      }
      fetch();
    } catch (error) {
      setError(true);
    }
  }, [])
  
  const dispatch=useDispatch();

  const addToCartHandler=(options)=>{
    dispatch({
      type:"addToCart",
      payload:options
    })
    dispatch({type:"calculateTotal"})
    toast.success("Added to Cart");
  }

  if(error) return <Error message="Error while fetching"/>

  return (
    <>
    {
      loading?(<Loader/>):
      (<div className="home">
      {product.map((item) => (
        <ProductCard
          key={item.id}
          name={item.title}
          id={item.id}
          price={+(item.price).toFixed()}
          handler={()=>addToCartHandler({id:item.id,name:item.name,price:+(item.price).toFixed(),image:item.image,quantity:1})}
          imgSrc={item.image}
        />
      ))}
    </div>)
    }
    </>
  );
}

const ProductCard=({name,id,price,handler,imgSrc})=>(
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <h4>{name}</h4>
    <h4>{`$${price}`}</h4>
    <button onClick={()=>handler()}>Add to Cart</button>
  </div>
);

export default Home