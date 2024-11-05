import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/products.json';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);

    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([ ])

    useEffect(() => {
        const savedCart = getShoppingCart();
        const productId  = Object.keys(savedCart);
        const previousCart = productId.map(id => {
            const product = fakeData.find(pd => pd.id === id);
            product.quantity = savedCart[id];
            return product;
        });
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        const productToBeAdded = product.id;
        const sameProduct = cart.find(pd => pd.id === productToBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.find(pd => pd.id !== productToBeAdded)
            newCart = [...other, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDb(product.id, count)
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product key={pd.id} showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} ></Cart>
                    <Link to={'/review'}>
                        <button className='product-btn'>Review Orders</button>
                    </Link>
            
            </div>
        </div>
    );
};

export default Shop;