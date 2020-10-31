import React, { Component } from 'react';
import './TextBoxProperties.css';

export default class TextBoxProperties extends Component {

    state = {
        value: 'enter text: '
    }
    
    render() {
        return (
            <>
                <form>
                    <label>
                        Desired Text:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }
}