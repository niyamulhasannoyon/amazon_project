import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product)
    const { img, name, seller, price, stock, id } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>

            <div className='product-part'>
                <h4 className='product-name'> <Link to={'/product/'+ id}>{name}</Link> </h4>
                <p><small>by: {seller} </small></p>
                <p>${price} </p>
                <p><small>Only {stock} left in stock - order soon</small></p>

                { props.showAddToCart && <button className='product-btn'
                onClick={() => props.handleAddProduct(props.product) }> 
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </button>}

            </div>

        </div>
    );
};

export default Product;