import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import { IoIosArrowRoundForward as Arrow } from "react-icons/io";
import './Toolbox.css';
import CartList from '../CartList/CartList';

export default class Toolbox extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();

        this.state = {
            renderToolbox: function() {}
        }
    }

    handleRenderToolbox = () => {
    };

    render() {
        let { toggleToolbox, toolboxVisible, cartItemsData, chooseType, renderToolbox } = this.context;
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
                        {renderToolbox()}
                    </div>
                    <div className="bottom-area">
                        <div className="outer-line" />
                    </div>
                </div>
            </>
        )
    }
}
