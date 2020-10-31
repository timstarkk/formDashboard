import React, { Component } from 'react';
import './TextBoxProperties.css';

export default class TextBoxProperties extends Component {

    constructor(props) {
        super();
        this.state = {
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('submitted: ' + this.state.value)
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Desired Text:
                        <input type="text" name="name" placeholder="enter text: " value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}