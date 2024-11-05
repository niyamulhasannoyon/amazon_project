import React, { useEffect, useState} from 'react';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import fakeData from '../../fakeData/products.json';
import Ri from '../ReviewItem/Ri';
import Cart from '../Cart/Cart';
import { useNavigate } from 'react-router-dom';



const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const navigate = useNavigate();

    const handleProceedCheckOut = () => {
        navigate("/shipment");
    }
        

    const handleRemoveProduct = (productId) => {
        const newCart = cart.filter(pd => pd.id !== productId);
        setCart(newCart);
        //Remove from local storage
        removeFromDb(productId);
    }

    useEffect(() => {
        //Cart
        const savedCart = getShoppingCart()
        const productId = Object.keys(savedCart);
        const cartProducts = productId.map(id => {
            const product = fakeData.find(pd => pd.id === id);
            product.quantity = savedCart[id];
            return product;
        });
        setCart(cartProducts);
    }, [])
    
    return (
        <div className='twin-container'>
            <div className='product-container'>
            <h2>Cart Items: {cart.length}</h2>
            {
                cart.map(pd => <Ri product={pd} key={pd.id} handleRemoveProduct={handleRemoveProduct}></Ri>)
            }

            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
                <button className='main-btn' onClick={handleProceedCheckOut}>Proceed CheckOut</button>
            </div>
        </div>
    );
};

export default Review;