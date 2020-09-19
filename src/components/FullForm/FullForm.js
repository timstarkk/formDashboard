import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import { IoIosArrowRoundForward as Arrow } from "react-icons/io";
import './FullForm.css';
import CartList from '../CartList/CartList';

export default class FullForm extends Component {
    static contextType = ItemContext;
    constructor() {
        super();
    }

    myFunction = () => {
        console.log('hello dude');
    };

    render() {
        let { toggleCart, cartVisible, cartItemsData } = this.context;
        let visibility = "hide";
        let subtotal = 0;

        for (const item of cartItemsData) {
            subtotal += item.price * item.amount
        };

        // can transform cartVisible into another variable
        // for opening and closing the dashboard toolbox
        // if (cartVisible) {
        //     visibility = 'show';
        //     document.getElementById('app-container').classList.add('show');
        //     document.body.classList.add('show');
        //     document.getElementsByTagName( 'html' )[0].classList.add('show');
        // } else {
        //     if (document.getElementById('app-container') !== null) {
        //         document.getElementById('app-container').classList.remove('show');
        //         document.body.classList.remove('show');
        //         document.getElementsByTagName( 'html' )[0].classList.remove('show');
        //     }
        // };
        return (
            <>
                <div id="menu-background" className={visibility} onClick={() => toggleCart()} />
                <div id="flyout-menu" className={visibility}>
                    <div className="top-area">
                        <CloseButton id="close-button" onClick={() => toggleCart()} />
                        <h3 id="your-cart">FullForm</h3>
                        <div className="outer-line" />
                    </div>
                    <div id="cart-items-area">
                        {/* <CartList cartItems={cartItemsData} /> */}
                        <div id="test-btn" className="btn btn-secondary" onClick={() => this.myFunction()}>hello</div>
                    </div>
                    <div className="bottom-area">
                        <div className="outer-line" />
                    </div>
                </div>
            </>
        )
    }
}
