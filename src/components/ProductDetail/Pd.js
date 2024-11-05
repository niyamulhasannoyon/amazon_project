import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/products.json';
import Product from '../Product/Product';

const Pd = () => {
    const {productId} = useParams();
    const product = fakeData.find(p => p.id === productId);

    return (
        <div>
            {/* <h1>{productId}</h1> */}
            <Product showAddToCart={false} product={product}> </Product>
        </div>
    );
};

export default Pd;