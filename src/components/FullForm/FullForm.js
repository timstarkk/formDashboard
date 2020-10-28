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
                                    {/* {displayForm()} */}
                                    <MyFirstGrid />
                                </>
                        }
                    </div>
                </div>
            </>
        )
    }
}


// const form = {
//     // rows and columns translate to amount of "auto" within grid-template-X: 
//     columns: 2,
//     rows: 3,
//     // elements are mapped into jsx one by one with appropriate names and id's etc.
//     elements: [
//         {
//             type: "text",
//             start: 1,
//             end: "end"
//         },
//         {
//             type: "checkbox",
//             start: 0,
//             end: false
//         },
//         {
//             type: "checkbox",
//             start: 0,
//             end: false
//         },
//         {
//             type: "text",
//             start: 1,
//             end: "end"
//         }
//     ]
// }