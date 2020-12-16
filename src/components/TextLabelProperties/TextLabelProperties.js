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
        const {
            updateTextValue
        } = this.context;

        this.setState({
            updateTextValue
        })
    };

    handleChange(event) {
        let name = event.target.name;
        
        if (name === "updateValue") {
            this.setState({value: event.target.value});
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;

        if (name === "updateValue") {
            this.state.updateTextValue(this.state.value);
        }
    };

    render() {
        return (
            <>
                {/* value */}
                <form onSubmit={this.handleSubmit} name="updateValue">
                    <label>
                        Desired Text:
                        <input type="text" name="updateValue" placeholder="enter text: " value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}