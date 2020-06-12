import {combineReducers} from 'redux';
import productListReducer from './productsListReducer';
import productDetailReducer from './productDetailReducer';

const rootReducer = combineReducers({
    productListReducer: productListReducer,
    productDetailReducer:productDetailReducer

})

export default rootReducer;
