import {combineReducers} from 'redux';
import productListReducer from './productsListReducer';

const rootReducer = combineReducers({
    productListReducer: productListReducer
})

export default rootReducer;
