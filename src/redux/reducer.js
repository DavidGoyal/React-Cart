import { createReducer } from "@reduxjs/toolkit";

export const reducer=createReducer(
    {
        cartItems:[],subTotal:0,shipping:0,tax:0,total:0,
    },
    (builder)=>{
        builder
            .addCase("decrement", (state,action)=>{
                const item=state.cartItems.find((x)=>x.id===action.payload);

                    state.cartItems.forEach((x)=>{
                        if(x.id===item.id){
                            if(x.quantity>1){
                                x.quantity-=1;
                            }
                        }
                    })
            })
            .addCase("addToCart",(state,action)=>{
                const item=action.payload;
                const itemExists=state.cartItems.find((x)=>x.id===item.id);
                if(itemExists){
                    state.cartItems.forEach((x)=>{
                        if(x.id===item.id){
                            x.quantity+=1;
                        }
                    })
                }
                else{
                    state.cartItems.push(item);
                }
            })
            .addCase("delete",(state,action)=>{
                const item=state.cartItems.find((x)=>x.id===action.payload);
                state.cartItems=state.cartItems.filter((x)=>x.id!==item.id);
            })

            .addCase("calculateTotal",(state)=>{
                let sum=0;
                state.cartItems.forEach((x)=>sum+=x.quantity*x.price)
                state.subTotal=sum;
                state.shipping=state.subTotal>1000 ? 0 : 200;
                state.tax=+(state.subTotal*0.18).toFixed();
                state.total=state.subTotal+state.shipping+state.tax;
            })
    }
)