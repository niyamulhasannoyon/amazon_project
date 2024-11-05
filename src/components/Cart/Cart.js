import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce((total, prd ) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i< cart.length; i++) {
        const prd = cart[i];
        total += prd.price * prd.quantity;
        // debugger;
    }

    let shipping = 0;
    if (total > 500){
        shipping = 0;
    }
    else if (total > 400){
        shipping = 4.99; 
    }
    else if (total > 100){
        shipping = 12.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formetNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }

    return (
        <div className='Price'>
            <h3>Order Summary</h3>
            <p>Items ordered: {cart.length} </p>
            <p>Product Price: $ {formetNumber(total)}</p>
            <p><small>Shipping Cost: $ {shipping}</small></p>
            <p><small>Tax + VAT: $ {tax} </small></p>
            <p>Total Price: $ {grandTotal} </p>

            {
                props.children
            }
        </div>
    );
};

export default Cart;