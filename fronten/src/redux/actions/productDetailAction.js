import {PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS} from './actionTypes';
import axios from  'axios';

const productDetailRequest = (productId) =>{
    return(
        (dispatch) => {
            //loading
            dispatch({
                type: PRODUCT_DETAIL_REQUEST,
                payload: {}
            })
            axios.get('/api/product/'+productId)
            .then(
                res => {
                    dispatch({
                        type: PRODUCT_DETAIL_SUCCESS,
                        payload: res.data
                    })
                }  
            )
            .catch(error=>{
                dispatch({
                    type: PRODUCT_DETAIL_FAIL,
                    payload: error
                })
            })
        }
    )

}

export default productDetailRequest;