import React from 'react';
import CartItem from '../CartItem/CartItem';

export default function CartList({ cartItems }) {
    console.log(cartItems);
    return (
        <div>
            {
                cartItems.map((item, index) => {
                    return <CartItem id={index} item={item} />;
                })
            }
        </div>
    )
}
