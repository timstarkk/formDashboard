import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import './FullForm.css';

export default class FullForm extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        console.log(props);
    }

    myFunction = () => {
        console.log('hello dude');
    };

    render() {
        let { hideToolbox } = this.context;
        let visibility = "hide";

        // can transform hideToolbox into another variable
        // for opening and closing the dashboard toolbox
        if (hideToolbox) {
            if (document.getElementById('full-form-container') !== null) {
                visibility = 'show';
                document.getElementById('full-form-container').classList.add('show');
                document.body.classList.add('show');
                document.getElementsByTagName('html')[0].classList.add('show');
            }
        } else {
            if (document.getElementById('full-form-container') !== null) {
                document.getElementById('full-form-container').classList.remove('show');
                document.body.classList.remove('show');
                document.getElementsByTagName('html')[0].classList.remove('show');
            }
        };

        return (
            <>
                <div className="container-wrapper">
                    <div id="full-form-container">
                        <p>hello from full form, display selected form contents here.</p>
                    </div>
                </div>
            </>
        )
    }
}
