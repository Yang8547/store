import {PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS} from '../actions/actionTypes';

const initialProductDetailState = {
    product: {},
    loading: true,
    error: {}
}

const productDetailReducer = (state=initialProductDetailState, action) => {
    switch(action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                product: action.payload,
                loading: false
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: true,
                error: action.payload
            }
        default:
            return state
    }
}
export default productDetailReducer;