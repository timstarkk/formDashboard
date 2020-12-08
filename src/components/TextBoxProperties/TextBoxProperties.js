import React, { Component } from 'react';
import './TextBoxProperties.css';
import { ItemContext } from '../../context';

export default class TextBoxProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
            value: '',
            updateTextBoxPlaceholder: function() {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { updateTextBoxPlaceholder } = this.context;

        this.setState({
            updateTextBoxPlaceholder
        })
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        const {updateTextBoxPlaceholder} = this.context;

        this.state.updateTextBoxPlaceholder(this.state.value);
    };


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <p>hello from textbox properties</p>
                    
                    {/* placeholder */}
                    <label>
                        placeholder:
                        <input type="text" name="name" placeholder="enter placeholder text: " value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                    {/* height */}
                    {/* width */}
                    {/* defaultValue */}
                    {/* borderWidth */}
                    {/* borderColor */}
                    {/* borderRadius */}
                    {/* textboxColor */}
                    {/* textColor */}
                    {/* fontSize */}
                    {/* fontFamily */}
                </form>
            </>
        )
    }
}