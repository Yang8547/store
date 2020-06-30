import {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_UPDATE_QTY,SHOW_CART} from '../actions/actionTypes';

const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type) {
        case SHOW_CART:
            return {
                cartItems:action.payload
            }
        case CART_ADD_ITEM:
            const product = state.cartItems.find(x=>x._id==action.payload._id);
            if(product){
                return {
                    cartItems:
                        state.cartItems.map(x=>{
                            if(x._id==product._id){
                                action.payload.qty += x.qty;
                                return action.payload
                            }else{
                                return x
                            }
                        })
                }
            }
            return {
                cartItems:[...state.cartItems, action.payload]
            }
        case CART_REMOVE_ITEM:
            return {
                cartItems: state.cartItems.filter(x=>x._id !== action.payload)
            }
        case CART_UPDATE_QTY:
            return {
                cartItems: state.cartItems.map(x=>{
                    if(x._id === action.payload.productId){
                        x.qty = action.payload.qty;
                        return x;
                    }else{
                        return x;
                    }
                })
            }
        default:
            return state
    }
}
export default cartReducer;