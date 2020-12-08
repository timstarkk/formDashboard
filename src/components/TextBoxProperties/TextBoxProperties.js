import React, { Component } from 'react';
import './TextBoxProperties.css';
import { ItemContext } from '../../context';

export default class TextBoxProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
        }
    }

    // componentDidMount() {
    // };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>hello from textbox properties</p>
                </form>
            </>
        )
    }
}