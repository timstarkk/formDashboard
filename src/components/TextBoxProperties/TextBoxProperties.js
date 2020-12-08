import React, { Component } from 'react';
import './TextBoxProperties.css';
import { ItemContext } from '../../context';

export default class TextBoxProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
            value: '',
            updateTextBoxPlaceholder: function() {},
            updateTextBoxHeight: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { updateTextBoxPlaceholder, updateTextBoxHeight } = this.context;

        this.setState({
            updateTextBoxPlaceholder,
            updateTextBoxHeight
        })
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;

        if (name === "updatePlaceholder") {
            this.state.updateTextBoxPlaceholder(this.state.value);
        } else if (name === "updateHeight") {
            this.state.updateTextBoxHeight(this.state.value);
        }
    };


    render() {
        return (
            <>
                {/* placeholder */}
                <form onSubmit={this.handleSubmit} name="updatePlaceholder">
                    <label>
                        placeholder:
                        <input type="text" placeholder="enter placeholder text: " value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {/* height */}
                <form onSubmit={this.handleSubmit} name="updateHeight">
                    <label>
                        height:
                        <input type="text" placeholder="enter height: " value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                
                {/* width */}
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