import React, { Component } from 'react';
import './TextBoxProperties.css';

export default class TextBoxProperties extends Component {

    state = {
        value: 'enter text: '
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log('submitted: ' + this.state.value)
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Desired Text:
                        <input type="text" name="name" value={this.state.value}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}