import {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_UPDATE_QTY} from "./actionTypes";
import axios from 'axios';
import Cookies from 'js-cookie'

const addToCart = (productId, qty) => (dispatch,getState) =>{
    axios.get('/api/product/'+productId)
    .then(
        res => {
            dispatch({
                type: CART_ADD_ITEM,
                payload: {...res.data, qty:Number(qty)}
            })
            const { cartReducer: { cartItems } } = getState();
            Cookies.set("cartItems", JSON.stringify(cartItems));
        }  
    )
    .catch(error=>{
    })

}

const removeFromCart = (productId) => (dispatch, getState)=>{
        dispatch({
            type:CART_REMOVE_ITEM,
            payload: productId
        } ) 
        const { cartReducer: { cartItems } } = getState();
        Cookies.set("cartItems", JSON.stringify(cartItems));
}

const updateCart = (productId, qty)=>{
    return {
        type:CART_UPDATE_QTY,
        payload:{
            productId,
            qty
        }
    }
}

export {addToCart, removeFromCart, updateCart}