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
            updateTextBoxPlaceholder: function() {},
            updateTextBoxHeight: function() {},
            updateTextBoxWidth: function() {},
            updateTextBoxDefaultValue: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth,
            updateTextBoxDefaultValue
        } = this.context;

        this.setState({
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth,
            updateTextBoxDefaultValue
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
                {/* borderColor */}
                {/* borderRadius */}
                {/* textboxColor */}
                {/* textColor */}
                {/* fontSize */}
                {/* fontFamily */}
            </>
        )
    }
}