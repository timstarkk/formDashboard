import React from 'react';
import './CartItem.css';
import { withItemConsumer } from '../../context';

function CartItem({ id, item, context }) {
    const { handlePlusMinus, cartId, cartItemsData } = context;
    let { name, images, price, itemId } = item;
    const img = images[0].imageFields.file.url;
    let amount = cartItemsData[id].amount;
    price = price * amount;

    function handleMinusClick() {
        handlePlusMinus(itemId, amount, "minus", id);
    }

    function handlePlusClick() {
        handlePlusMinus(itemId, amount, "plus", id);
    }

    return (
        <div className="cart-item">
            <div className="cart-details">
                <img src={img} className="item-img" />
                <div className="cart-info">
                    <h4 className="item-name">{name}</h4>
                    <div className="plus-minus-area">
                        <div className="plus-minus minus-one" onClick={handleMinusClick}>
                            -
                        </div>
                        <div className="amount-area">{amount}</div>
                        <div className="plus-minus plus-one" onClick={handlePlusClick}>
                            +
                        </div>
                    </div>
                    <p className="item-price">${price}</p>
                </div>
            </div>
            <div className="line" />
        </div>
    )
}

export default withItemConsumer(CartItem);