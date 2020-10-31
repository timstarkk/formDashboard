import React, { Component } from 'react'

export default class Properties extends Component {
    render() {
        {if (selectedType === 'text') {
            return (
                <>
                    <p>text properties:</p>
                </>
            )
        } else if (selectedType === 'radio') {
            return (
                <>
                    <p>radio properties:</p>
                </>
            )
        } else if (selectedType === 'checkbox') {
            return (
                <>
                    <p>checkbox properties:</p>
                </>
            )
        } else if (selectedType === 'textbox') {
            return (
                <>
                    <h3>text item properties:</h3>
                </>
            )
        };}
    }
}
