import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home(props){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch data
        axios.get('/api/products')
        .then(
            res => {
                setProducts(res.data);
            }
        ) 
        return () => {
            //clean up
        }
    },[])    

    return(
        <ul className="products">
        {
            products.map((product) => 
            <li key={product._id}>
            <div className="product">
                <Link to={'product/'+product._id}>
                <img className="product-image" src={product.image} alt="product" />
                </Link>
                <div className="product-name">
                <Link to={'product/'+product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
            </div>
            </li>
            )
        }
        </ul>
    ) 
    
}

export default Home;