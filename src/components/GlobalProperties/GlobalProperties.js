import React, { Component } from 'react';
import './GlobalProperties.css';
import { ItemContext } from '../../context';

export default class GlobalProperties extends Component {
    static contextType = ItemContext;
    constructor(props) {
        super();
        this.state = {
        }

        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {
        } = this.context;

        // this.setState({
        // })
    };

    handleChange(event) {
        let name = event.target.name;
    };

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name;
    };


    render() {
        return (
            <>
                <p>hello from global properties</p>
            </>
        )
    }
}