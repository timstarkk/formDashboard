import React, { Component } from 'react';
import './TextLabelProperties.css';
import { ItemContext } from '../../context';

export default class TextLabelProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
            value: '',
            textColor: '',
            updateTextValue: function() {},
            updateTextColor: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {
            updateTextValue,
            updateTextColor
        } = this.context;

        this.setState({
            updateTextValue,
            updateTextColor
        })
    };

    handleChange(event) {
        let name = event.target.name;
        
        if (name === "updateValue") {
            this.setState({value: event.target.value});
        } else if (name === "updateTextColor") {
            this.setState({textColor: event.target.value})
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;
        console.log(this.state.textColor)

        if (name === "updateValue") {
            this.state.updateTextValue(this.state.value);
        } else if (name === "updateTextColor") {
            this.state.updateTextColor(this.state.textColor);
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
                
                {/* textColor */}
                <form onSubmit={this.handleSubmit} name="updateTextColor">
                    <label>
                        Text Color:
                        <input type="text" placeholder="enter text color: " name="updateTextColor" value={this.state.textColor} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}