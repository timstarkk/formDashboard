import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import { IoIosArrowRoundForward as Arrow } from "react-icons/io";
import './Toolbox.css';
import CartList from '../CartList/CartList';

export default class Toolbox extends Component {
    static contextType = ItemContext;
    constructor() {
        super();
    }

    render() {
        let { toggleToolbox, toolboxVisible, cartItemsData, chooseType, addLabel } = this.context;
        let visibility = "hide";
        let subtotal = 0;

        for (const item of cartItemsData) {
            subtotal += item.price * item.amount
        };

        if (toolboxVisible) {
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
                <div id="menu-background" className={visibility} onClick={() => toggleToolbox()} />
                <div id="flyout-menu" className={visibility}>
                    <div className="top-area">
                        <CloseButton id="close-button" onClick={() => toggleToolbox()} />
                        <h3 id="your-cart">Toolbox</h3>
                        <div className="outer-line" />
                    </div>
                    <div id="toolbox-items-area">
                        {/* <CartList cartItems={cartItemsData} /> */}
                        <div className="btn btn-secondary element-btn" onClick={() => chooseType('text')}>Text Input</div>
                        <div className="btn btn-secondary element-btn" onClick={() => chooseType('radio')}>Radio</div>
                        <div className="btn btn-secondary element-btn" onClick={() => chooseType('checkbox')}>Checkbox</div>
                        {/* <div className="btn btn-secondary element-btn" onClick={chooseType('dropdown')}>Drop down</div> */}
                        <div className="btn btn-secondary element-btn" onClick={addLabel}>Text Label</div>
                    </div>
                    <div className="bottom-area">
                        <div className="outer-line" />
                    </div>
                </div>
            </>
        )
    }
}
