import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import './FullForm.css';

export default class FullForm extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        console.log(props);

        this.state = {
            textbox: ""
        }
    }

    myFunction = () => {
        console.log('hello dude');
    };

    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        let { hideToolbox, forms, formSelected, selectedForm } = this.context;
        let visibility = "hide";
        
        // can transform hideToolbox into another variable
        // for opening and closing the dashboard toolbox
        if (hideToolbox) {
            if (document.getElementById('full-form-container') !== null) {
                visibility = 'show';
                document.getElementById('full-form-container').classList.add('show');
            }
        } else {
            if (document.getElementById('full-form-container') !== null) {
                document.getElementById('full-form-container').classList.remove('show');
            }
        };

        return (
            <>
                <div className="container-wrapper">
                    <div id="full-form-container">
                    {
                        // formSelected == false ?
                        //     <p>'please select a form'</p> :
                        //     <>
                        //         <p>{selectedForm.contents}</p>
                        //     </>
                    }
                    <div class="grid-item">1</div>
                    <div class="grid-item">2</div>
                    <div class="grid-item">3</div>
                    <div class="grid-item">4</div>
                    <div class="grid-item">5</div>
                    <div class="grid-item">6</div>
                    <input
                        type="text"
                        name="textbox"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    </div>
                </div>
            </>
        )
    }
}
