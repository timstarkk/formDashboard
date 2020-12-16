import React, { Component } from 'react';
import './TextBoxProperties.css';
import { ItemContext } from '../../context';

export default class TextBoxProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
            placeholderValue: '',
            heightValue: '',
            widthValue: '',
            defaultValue: '',
            borderWidth: '',
            borderColor: '',
            borderRadius: '',
            textboxColor: '',
            textColor: '',
            fontSize: '',
            fontFamily: '',
            paddingLeft: '',
            fontWeight: '',
            updateTextBoxPlaceholder: function() {},
            updateTextBoxHeight: function() {},
            updateTextBoxWidth: function() {},
            updateTextBoxDefaultValue: function() {},
            updateTextBoxBorderWidth: function() {},
            updateTextBoxBorderColor: function() {},
            updateTextBoxBorderRadius: function() {},
            updateTextBoxTextboxColor: function() {},
            updateTextBoxTextColor: function() {},
            updateTextBoxFontSize: function() {},
            updateTextBoxFontFamily: function() {},
            updateTextBoxPaddingLeft: function() {},
            updateTextBoxFontWeight: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth,
            updateTextBoxDefaultValue,
            updateTextBoxBorderWidth,
            updateTextBoxBorderColor,
            updateTextBoxBorderRadius,
            updateTextBoxTextboxColor,
            updateTextBoxTextColor,
            updateTextBoxFontSize,
            updateTextBoxFontFamily,
            updateTextBoxPaddingLeft,
            updateTextBoxFontWeight
        } = this.context;

        this.setState({
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth,
            updateTextBoxDefaultValue,
            updateTextBoxBorderWidth,
            updateTextBoxBorderColor,
            updateTextBoxBorderRadius,
            updateTextBoxTextboxColor,
            updateTextBoxTextColor,
            updateTextBoxFontSize,
            updateTextBoxFontFamily,
            updateTextBoxPaddingLeft,
            updateTextBoxFontWeight
        })
    };

    handleChange(event) {
        let name = event.target.name;

        if (name === "updatePlaceholder") {
            this.setState({placeholderValue: event.target.value});
        } else if (name === "updateHeight") {
            this.setState({heightValue: event.target.value});
        } else if (name === "updateWidth") {
            this.setState({widthValue: event.target.value});
        } else if (name === "updateDefaultValue") {
            this.setState({defaultValue: event.target.value});
        } else if (name === "updateBorderWidth") {
            this.setState({borderWidth: event.target.value});
        } else if (name === "updateBorderColor") {
            this.setState({borderColor: event.target.value});
        } else if (name === "updateBorderRadius") {
            this.setState({borderRadius: event.target.value});
        } else if (name === "updateTextboxColor") {
            this.setState({textboxColor: event.target.value});
        } else if (name === "updateTextColor") {
            this.setState({textColor: event.target.value});
        } else if (name === "updateFontSize") {
            this.setState({fontSize: event.target.value});
        } else if (name === "updateFontFamily") {
            this.setState({fontFamily: event.target.value});
        } else if (name === "updatePaddingLeft") {
            this.setState({paddingLeft: event.target.value});
        } else if (name === "updateFontWeight") {
            this.setState({fontWeight: event.target.value});
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;

        if (name === "updatePlaceholder") {
            this.state.updateTextBoxPlaceholder(this.state.placeholderValue);
        } else if (name === "updateHeight") {
            this.state.updateTextBoxHeight(this.state.heightValue);
        } else if (name === "updateWidth") {
            this.state.updateTextBoxWidth(this.state.widthValue);
        } else if (name === "updateDefaultValue") {
            this.state.updateTextBoxDefaultValue(this.state.defaultValue);
        } else if (name === "updateBorderWidth") {
            this.state.updateTextBoxBorderWidth(this.state.borderWidth);
        } else if (name === "updateBorderColor") {
            this.state.updateTextBoxBorderColor(this.state.borderColor);
        } else if (name === "updateBorderRadius") {
            this.state.updateTextBoxBorderRadius(this.state.borderRadius);
        } else if (name === "updateTextboxColor") {
            this.state.updateTextBoxTextboxColor(this.state.textboxColor);
        } else if (name === "updateTextColor") {
            this.state.updateTextBoxTextColor(this.state.textColor);
        } else if (name === "updateFontSize") {
            this.state.updateTextBoxFontSize(this.state.fontSize);
        } else if (name === "updateFontFamily") {
            this.state.updateTextBoxFontFamily(this.state.fontFamily);
        } else if (name === "updatePaddingLeft") {
            this.state.updateTextBoxPaddingLeft(this.state.paddingLeft);
        } else if (name === "updateFontWeight") {
            this.state.updateTextBoxFontWeight(this.state.fontWeight);
        }
    };


    render() {
        return (
            <>
                {/* placeholder */}
                <form onSubmit={this.handleSubmit} name="updatePlaceholder">
                    <label>
                        placeholder:
                        <input type="text" placeholder="enter placeholder text: " name="updatePlaceholder" value={this.state.placeholderValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* height */}
                <form onSubmit={this.handleSubmit} name="updateHeight">
                    <label>
                        height:
                        <input type="text" placeholder="enter height: " name="updateHeight" value={this.state.heightValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* width */}
                <form onSubmit={this.handleSubmit} name="updateWidth">
                    <label>
                        width:
                        <input type="text" placeholder="enter width: " name="updateWidth" value={this.state.widthValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* defaultValue */}
                <form onSubmit={this.handleSubmit} name="updateDefaultValue">
                    <label>
                        default value:
                        <input type="text" placeholder="enter default value: " name="updateDefaultValue" value={this.state.defaultValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* borderWidth */}
                <form onSubmit={this.handleSubmit} name="updateBorderWidth">
                    <label>
                        Border Width:
                        <input type="text" placeholder="enter border width: " name="updateBorderWidth" value={this.state.borderWidth} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* borderColor */}
                <form onSubmit={this.handleSubmit} name="updateBorderColor">
                    <label>
                        Border Color:
                        <input type="text" placeholder="enter border Color: " name="updateBorderColor" value={this.state.borderColor} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* borderRadius */}
                <form onSubmit={this.handleSubmit} name="updateBorderRadius">
                    <label>
                        Border Radius:
                        <input type="text" placeholder="enter border Radius: " name="updateBorderRadius" value={this.state.borderRadius} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* textboxColor */}
                <form onSubmit={this.handleSubmit} name="updateTextboxColor">
                    <label>
                        Textbox Color:
                        <input type="text" placeholder="enter textbox color: " name="updateTextboxColor" value={this.state.textboxColor} onChange={this.handleChange} />
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

                {/* paddingLeft */}
                <form onSubmit={this.handleSubmit} name="updatePaddingLeft">
                    <label>
                        Padding Left:
                        <input type="text" placeholder="enter padding left: " name="updatePaddingLeft" value={this.state.paddingLeft} onChange={this.handleChange} />
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