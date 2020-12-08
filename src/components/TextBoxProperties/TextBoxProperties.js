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
            updateTextBoxPlaceholder: function() {},
            updateTextBoxHeight: function() {},
            updateTextBoxWidth: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { updateTextBoxPlaceholder, updateTextBoxHeight, updateTextBoxWidth } = this.context;

        this.setState({
            updateTextBoxPlaceholder,
            updateTextBoxHeight,
            updateTextBoxWidth
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
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;

        if (name === "updatePlaceholder") {
            this.state.updateTextBoxPlaceholder(this.state.value);
        } else if (name === "updateHeight") {
            this.state.updateTextBoxHeight(this.state.value);
        } else if (name === "updateWidth") {
            this.state.updateTextBoxWidth(this.state.value);
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