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
            updateTextBoxPlaceholder: function() {},
            updateTextBoxHeight: function() {},
            updateTextBoxWidth: function() {},
            updateTextBoxDefaultValue: function() {},
            updateTextBoxBorderWidth: function() {},
            updateTextBoxBorderColor: function() {},
            updateTextBoxBorderRadius: function() {}
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
            updateTextBoxBorderRadius
        } = this.context;

        this.setState({
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth,
            updateTextBoxDefaultValue,
            updateTextBoxBorderWidth,
            updateTextBoxBorderColor,
            updateTextBoxBorderRadius
        })
    };

    handleChange(event) {
        let name = event.target.name;
        console.log(name);
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
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;
        console.log(name);

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
                {/* textColor */}
                {/* fontSize */}
                {/* fontFamily */}
            </>
        )
    }
}