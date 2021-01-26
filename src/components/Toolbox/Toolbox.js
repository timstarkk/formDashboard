import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import { IoIosArrowRoundForward as Arrow } from "react-icons/io";
import './Toolbox.css';
import CartList from '../CartList/CartList';
import Properties from '../Properties/Properties';
import Switch from "react-switch";

export default class Toolbox extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();

        this.state = {
            openSwitch: false,
            renderToolbox: function() {},
            chooseType: function() {}
        }
    }

    componentDidMount = () => {
        const { renderToolbox, chooseType } = this.context;

        this.setState({
            renderToolbox,
            chooseType
        });
    };

    handleRenderToolbox = () => {
        let selectedType = this.state.renderToolbox();

        if (selectedType === 'global') {
            // render global properties toolbox
            return (
                <>
                    <div>
                        <div>
                            <Switch 
                                onChange={() => this.handleSwitch(this.state.openSwitch)} 
                                checked={this.state.openSwitch} 
                                height={18}
                                width={38}
                                uncheckedIcon={false}
                                checkedIcon={false}
                            /> 
                        </div>
                    </div>
                </>
            )
        } else if (selectedType === 'none') {
            return (
                <>
                    <div className="btn btn-secondary element-btn" onClick={() => this.state.chooseType('text')}>Textbox</div>
                    <div className="btn btn-secondary element-btn" onClick={() => this.state.chooseType('radio')}>Radio</div>
                    <div className="btn btn-secondary element-btn" onClick={() => this.state.chooseType('checkbox')}>Checkbox</div> 
                    <div className="btn btn-secondary element-btn" onClick={() => this.state.chooseType('textlabel')}>Text Label</div>
                </>
            )
        } else if (selectedType !== 'none') {
            // return from here the <Properties> object
            return <Properties type={selectedType} />
        } else {
            return <p></p>;
        }
    };

    handleSwitch = (openSwitch) => {
        console.log('hello from global form switch');
        // run some function
        
        this.setState({ openSwitch: !openSwitch });
    };

    render() {
        let { toggleToolbox, toolboxVisible, cartItemsData, chooseType } = this.context;
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
                        {this.handleRenderToolbox()}
                    </div>
                    <div className="bottom-area">
                        <div className="outer-line" />
                    </div>
                </div>
            </>
        )
    }
}
