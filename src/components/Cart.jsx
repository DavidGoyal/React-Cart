import React from 'react'
import {AiFillDelete} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'


const Cart = () => {


    const dispatch=useDispatch();


    const deleteHandler=(id)=>{
        dispatch({type:"delete", payload:id})
        dispatch({type:"calculateTotal"})
    }

    const increment=(id)=>{
        dispatch({type:"addToCart", payload:{id}})
        dispatch({type:"calculateTotal"})
    }

    const decrement=(id)=>{
        dispatch({type:"decrement", payload:id})
        dispatch({type:"calculateTotal"})
    }

    const {cartItems,subTotal,tax,shipping,total}=useSelector(state=>state.cart);

  return (
    <div className="cart">
      <main>
        {cartItems.length == 0 ? (
          <h1>Cart is empty</h1>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              imgSrc={item.image}
              name={item.name}
              price={item.price}
              id={item.id}
              deleteHandler={deleteHandler}
              qty={item.quantity}
              increment={increment}
              decrement={decrement}
            />
          ))
        )}
      </main>

      <aside>
        <h2>Subtotal: ${subTotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
      </aside>
    </div>
  );
}

const CartItem=({imgSrc,name,price,qty,decrement,increment,deleteHandler,id})=>(
    <div className="cartItem">
        <img src={imgSrc} alt={name} />
        <article>
            <h3>{name}</h3>
            <p>${price}</p>
        </article>

        <div>
            <button onClick={()=>decrement(id)}>-</button>
            <p>{qty}</p>
            <button onClick={()=>increment(id)}>+</button>
        </div>
        <AiFillDelete onClick={()=>deleteHandler(id)}/>

    </div>
)

export default Cart