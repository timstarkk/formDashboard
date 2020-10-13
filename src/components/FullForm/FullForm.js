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
        let { hideToolbox, forms, formSelected, displayForm } = this.context;
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
                            displayForm()
                        }
                        {
                            // formSelected == false ?
                            //     <p>'please select a form'</p> :
                            //     <>
                            //         <p>{selectedForm.contents}</p>
                            //     </>
                        }
                        {/* <input
                            id="textbox1"
                            type="text"
                            name="textbox"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input
                            id="textbox2"
                            type="text"
                            name="textbox2"
                            value={this.state.value}
                            onChange={this.handleChange}
                        /> */}
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