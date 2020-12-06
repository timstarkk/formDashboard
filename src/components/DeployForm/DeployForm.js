import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import { API, graphqlOperation } from 'aws-amplify';
import { ItemContext } from '../../context';
import './DeployForm.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DeployForm extends Component {
    static contextType = ItemContext;

    state = {
        formId: "",
        form: []
    }
    
    async componentDidMount() {
        let formId = this.props.formId;
        let { handleDeployForm } = this.context;

        console.log(handleDeployForm);
        await handleDeployForm(formId);

        this.setState({
            formId
        })
    }

    // findInDatabase = async () => {
    //     // await return of database query

    //     // need to consider what the page will render
    //     // while this functjion is running.
    //     // need to display a loading icon during that time.

    //     await this.state.handleDeployForm(this.state.formId);
    // }

    render() {
        const { layouts, displayForm } = this.context;

        return (
            <>
                <div class="fullForm">
                    <ResponsiveReactGridLayout 
                    className="layout" 
                    layouts={layouts}
                    onLayoutChange={this.onLayoutChange}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
                    rowHeight={30}>
                    {/* have these grid items populate based on database object.*/}
                    {displayForm()}
                    </ResponsiveReactGridLayout>
                </div>
            </>
        )
    }
}
