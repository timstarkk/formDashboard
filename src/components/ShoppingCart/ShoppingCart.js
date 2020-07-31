import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import { IoIosArrowRoundForward as Arrow } from "react-icons/io";
import './ShoppingCart.css';
import CartList from '../CartList/CartList';

export default class ShoppingCart extends Component {
    static contextType = ItemContext;
    constructor() {
        super();
    }

    render() {
        let { toggleCart, cartVisible, cartItemsData } = this.context;
        let visibility = "hide";
        let subtotal = 0;

        for (const item of cartItemsData) {
            subtotal += item.price * item.amount
        };

        if (cartVisible) {
            visibility = 'show';
            document.getElementById('app-container').classList.add('show');
            document.body.classList.add('show');
            document.getElementsByTagName( 'html' )[0].classList.add('show');
        } else {
            if (document.getElementById('app-container') !== null) {
                document.getElementById('app-container').classList.remove('show');
                document.body.classList.remove('show');
                document.getElementsByTagName( 'html' )[0].classList.remove('show');
            }
        };
        return (
            <>
                <div id="menu-background" className={visibility} onClick={() => toggleCart()} />
                <div id="flyout-menu" className={visibility}>
                    <div className="top-area">
                        <CloseButton id="close-button" onClick={() => toggleCart()} />
                        <h3 id="your-cart">Your Cart</h3>
                        <div className="outer-line" />
                    </div>
                    <div id="cart-items-area">
                        <CartList cartItems={cartItemsData} />
                    </div>
                    <div className="bottom-area">
                        <div className="outer-line" />
                        <div id="subtotal-area">
                            <h5>subtotal</h5>
                            <h5>${subtotal}</h5>
                        </div>
                        <div className="disclaimer">
                            <p>Taxes and shipping calculated at checkout</p>
                        </div>
                        <div className="btn btn-primary checkout-button">checkout <Arrow className="checkout-arrow" /></div>
                    </div>
                </div>
            </>
        )
    }
}
