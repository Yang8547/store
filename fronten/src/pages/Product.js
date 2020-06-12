import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import productDetailRequest from '../redux/actions/productDetailAction';


function Product(props){
    //use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    
    let {id} = useParams();
    const productDetailState = useSelector((state) => state.productDetailReducer);
    const {product,loading,error} = productDetailState;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(productDetailRequest(id));
    },[])
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
                Status: {product.status}
              </li>
              <li>
                Qty: <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </li>
              <li>
                <button className="button primary" >Add to Cart</button>
              </li>
            </ul>
          </div>
    
        </div>
    
    </div>
    )
    
}

export default Product;