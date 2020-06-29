import {combineReducers} from 'redux';
import productListReducer from './productsListReducer';
import productDetailReducer from './productDetailReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    productListReducer: productListReducer,
    productDetailReducer:productDetailReducer,
    cartReducer:cartReducer

})

export default rootReducer;
