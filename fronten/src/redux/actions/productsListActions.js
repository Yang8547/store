import {PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_REQUEST} from './actionTypes';
import axios from 'axios';


export const productListRequest = () => {
    return (dispatch) => {
        // loading
        dispatch(
            {
                type: PRODUCT_LIST_REQUEST,
                payload: []
            }
        )
        // fetching data
        axios.get('/api/products')
        .then((res)=>{
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: res.data
                })
            }
        )
        .catch(error => {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.message
            }) 
        })
    }
}