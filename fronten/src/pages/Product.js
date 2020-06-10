import React from 'react';
import {useParams} from 'react-router-dom';
import data from '../data';

function Product(props){
    //use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let {id} = useParams();
    let product = data.products.find(product=>
        product._id === id
    )
    return(
        <div>
            Product page {product.name}
        </div>
    )
    
}

export default Product;