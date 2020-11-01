import React, { Component } from 'react'
import { ItemContext } from '../../context';
import { MdClose as CloseButton } from "react-icons/md";
import './FullForm.css';

import MyFirstGrid from '../MyFirstGrid/MyFirstGrid';

export default class FullForm extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        console.log(props);

        this.state = {
            textbox: "",
            textbox2: ""
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
        let { hideFormsList, forms, formSelected, displayForm } = this.context;
        let visibility = "hide";
        
        // can transform hideFormsList into another variable
        // for opening and closing the dashboard toolbox
        if (hideFormsList) {
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
                            formSelected == false ?
                                <p>'please select a form'</p> :
                                <>
                                    <MyFirstGrid />
                                </>
                        }
                        {/* will need the text displayed in button to be pulled from */}
                        <div>
                            <div className="btn btn-primary">Submit</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}