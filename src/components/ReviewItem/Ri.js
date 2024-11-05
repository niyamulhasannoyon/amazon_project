import React from 'react';
import './Ri.css';


const Ri = (props) => {
    // console.log(props);
    const {name, quantity, id, price} = props.product;
    const style ={
        border: '1px solid lightgray',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#f2f2f2',
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '50px',
        paddingBottom: '15px'
    }
    return (
        <div className='products' style={style}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p> <br />
            <p><small>$ {price}</small></p>
            <button className='main-btn' 
            onClick={() => props.handleRemoveProduct(id)}
            >Remove</button>
        </div>
    );
};

export default Ri;