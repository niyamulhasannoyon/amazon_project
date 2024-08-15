import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div className='product-part'>
                <h4 className='product-name'>{name} </h4>
                <p><small>by: {seller} </small></p>
                <p>${price} </p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button className='product-btn'
                onClick={() => props.handleAddProduct(props.product) }> 
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>
            </div>

        </div>
    );
};

export default Product;