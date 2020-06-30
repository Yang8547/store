import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import productDetailRequest from '../redux/actions/productDetailAction';
import {addToCart} from '../redux/actions/cartActions';


function Product(props){
    // use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    
    let {id} = useParams();
    const productDetailState = useSelector((state) => state.productDetailReducer);
    const {product,loading,error} = productDetailState;
    const dispatch = useDispatch();

    // product quantity
    const [qty, setQty] = useState(1);

    useEffect(()=>{
        dispatch(productDetailRequest(id));
    },[])

    const handleAddToCart = (productId,qty)=>{
        // props.history.push("/cart/"+id+"?qty="+qty)
        dispatch(addToCart(productId,qty))
        window.confirm('Added!')
    }
    return(
    loading?<div>loading...</div>:
    error?<div>{error}</div>:
    <div>
        <div className="back-to-result">
          <Link to="/">Back to result</Link>
        </div>
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product" ></img>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>
                  {product.description}
                </div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>
                Price: {product.price}
              </li>
              <li>
                Status: {product.countInStock>0? "Available":"Out of Stock"}
              </li>
              <li>
                Qty: <select value={qty} onChange={e=>setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                </select>
              </li>
              <li>
                {product.countInStock>0 && <button onClick={e=>handleAddToCart(product._id,qty)} className="button primary" >Add to Cart</button>}
              </li>
            </ul>
          </div>
    
        </div>
    
    </div>
    )
    
}

export default Product;