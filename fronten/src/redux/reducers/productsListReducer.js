import {PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST} from '../actions/actionTypes';

const intialProductListState = {
    products:[],
    loading: true,
    error: {}
}

const productListReducer = (state = intialProductListState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading:true};
        case PRODUCT_LIST_SUCCESS:
            return {
                loading:false,
                products: action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default productListReducer;