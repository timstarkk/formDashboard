import React from 'react';
import './DeployForm.css';
import { API, graphqlOperation } from 'aws-amplify';

export default function DeployForm(props) {
    let formId = props.formId;

    const findInDatabase = async () => {
        // await return of database query

        // need to consider what the page will render
        // while this functjion is running.
        // need to display a loading icon during that time.

        //comment to test commit 

        // const getForms = `
        // query {
        //     getUser(id: "${userId}") {
        //         forms {
        //             id
        //             contents {
        //                 columns
        //                 rows
        //                 layout {
        //                     h
        //                     i
        //                     isBounded
        //                     isDraggable
        //                     isResizable
        //                     maxH
        //                     maxW
        //                     minH
        //                     minW
        //                     moved
        //                     resizeHandles
        //                     static
        //                     w
        //                     x
        //                     y
        //                     type
        //                     isLabel
        //                     labelFor
        //                     textValue
        //                 }
        //             }
        //         }
        //     }
        // }
        // `
    }

    if (formId == 'false') {
        return (
            <div>
                hello from false false
            </div>
        )
    } else if (formId == 'true') {
        return (
            <div>
                hello from true true true
            </div>
        )
    } else {
        return (
            <div>
                hello from DeployForm component
            </div>
        )
    }
}


// might need ReactDOM.render();