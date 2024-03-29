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
            fontItalic: Boolean,
            updateTextValue: function() {},
            updateTextColor: function() {},
            updateFontSize: function() {},
            updateFontFamily: function() {},
            updateFontWeight: function() {},
            updateFontItalic: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // grab checked/unchecked from italic inside this grid item's layout
        const {
            selectedGridItem,
            layouts,
            updateTextValue,
            updateTextColor,
            updateFontSize,
            updateFontFamily,
            updateFontWeight,
            updateFontItalic
        } = this.context;

        let checked = false;
        let layout = layouts.lg;

        for (const item of layout) {
            if (item.i === selectedGridItem) {
                if (!item.italic || item.italic === undefined) {
                    // do nothing
                } else {
                    checked = item.italic;
                }
            }
        }

        this.setState({
            fontItalic: checked,
            updateTextValue,
            updateTextColor,
            updateFontSize,
            updateFontFamily,
            updateFontWeight,
            updateFontItalic
        })
    };

    handleChange(event) {
        let name = event.target.name;
        let type = event.target.type;

        if (type == 'checkbox') {
            // is checkbox, update state

            if (name === "updateFontItalic") {
                this.setState({fontItalic: !this.state.fontItalic}, () => this.state.updateFontItalic(this.state.fontItalic));
            };
        } else if (name === "updateValue") {
            this.setState({value: event.target.value});
        } else if (name === "updateTextColor") {
            this.setState({textColor: event.target.value})
        } else if (name === "updateFontSize") {
            this.setState({fontSize: event.target.value});
        } else if (name === "updateFontFamily") {
            this.setState({fontFamily: event.target.value});
        } else if (name === "updateFontWeight") {
            this.setState({fontWeight: event.target.value});
        };
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;

        if (name === "updateValue") {
            this.state.updateTextValue(this.state.value);
        } else if (name === "updateTextColor") {
            this.state.updateTextColor(this.state.textColor);
        } else if (name === "updateFontSize") {
            this.state.updateFontSize(this.state.fontSize);
        } else if (name === "updateFontFamily") {
            this.state.updateFontFamily(this.state.fontFamily);
        } else if (name === "updateFontWeight") {
            this.state.updateFontWeight(this.state.fontWeight);
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

                {/* fontItalic */}
                <label>
                    Font Italic: 
                    <input type="checkbox" name="updateFontItalic" checked={this.state.fontItalic} onChange={this.handleChange} />
                </label>

            </>
        )
    }
}