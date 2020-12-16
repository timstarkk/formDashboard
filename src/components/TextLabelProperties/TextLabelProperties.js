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
            fontSize: '',
            fontFamily: '',
            fontWeight: '',
            updateTextValue: function() {},
            updateTextColor: function() {},
            updateTextBoxFontSize: function() {},
            updateTextBoxFontFamily: function() {},
            updateTextBoxFontWeight: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {
            updateTextValue,
            updateTextColor,
            updateTextBoxFontSize,
            updateTextBoxFontFamily,
            updateTextBoxFontWeight
        } = this.context;

        this.setState({
            updateTextValue,
            updateTextColor,
            updateTextBoxFontSize,
            updateTextBoxFontFamily,
            updateTextBoxFontWeight
        })
    };

    handleChange(event) {
        let name = event.target.name;
        
        if (name === "updateValue") {
            this.setState({value: event.target.value});
        } else if (name === "updateTextColor") {
            this.setState({textColor: event.target.value})
        } else if (name === "updateFontSize") {
            this.setState({fontSize: event.target.value});
        } else if (name === "updateFontFamily") {
            this.setState({fontFamily: event.target.value});
        } else if (name === "updateFontWeight") {
            this.setState({fontWeight: event.target.value});
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
        } else if (name === "updateFontSize") {
            this.state.updateTextBoxFontSize(this.state.fontSize);
        } else if (name === "updateFontFamily") {
            this.state.updateTextBoxFontFamily(this.state.fontFamily);
        } else if (name === "updateFontWeight") {
            this.state.updateTextBoxFontWeight(this.state.fontWeight);
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

                {/* fontSize */}
                <form onSubmit={this.handleSubmit} name="updateFontSize">
                    <label>
                        Font Size:
                        <input type="text" placeholder="enter font size: " name="updateFontSize" value={this.state.fontSize} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* fontFamily */}
                <form onSubmit={this.handleSubmit} name="updateFontFamily">
                    <label>
                        Font Family:
                        <input type="text" placeholder="enter font family: " name="updateFontFamily" value={this.state.fontFamily} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* fontWeight */}
                <form onSubmit={this.handleSubmit} name="updateFontWeight">
                    <label>
                        Font Weight:
                        <input type="text" placeholder="enter font weight: " name="updateFontWeight" value={this.state.fontWeight} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </>
        )
    }
}