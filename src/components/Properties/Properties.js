import React, { Component } from 'react';
import { IoIosReturnRight } from 'react-icons/io';
import { ItemContext } from '../../context';
import TextBoxProperties from './../TextBoxProperties/TextBoxProperties';



export default class Properties extends Component {

    constructor(props) {
        super();
        this.state = {
        };
    };

    render() {
        let { type } = this.props;

        if (type === 'text') {
            return (
                <>
                    <p>text properties:</p>
                </>
            )
        } else if (type === 'radio') {
            return (
                <>
                    <p>radio properties:</p>
                </>
            )
        } else if (type === 'checkbox') {
            return (
                <>
                    <p>checkbox properties:</p>
                </>
            )
        } else if (type === 'textbox') {
            return (
                <>
                    <h3>text item properties:</h3>
                    <TextBoxProperties />
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }
}
