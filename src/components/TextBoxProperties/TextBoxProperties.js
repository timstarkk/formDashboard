import React, { Component } from 'react';
import './TextBoxProperties.css';
import { ItemContext } from '../../context';

export default class TextBoxProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
            value: '',
            updateTextValue: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { updateTextValue } = this.context;
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    };

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