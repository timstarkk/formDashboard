import React, { Component } from 'react';
import './TextLabelProperties.css';
import { ItemContext } from '../../context';

export default class TextLabelProperties extends Component {
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

        this.setState({
            updateTextValue
        })
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const {updateTextValue} = this.context;

        this.state.updateTextValue(this.state.value);
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