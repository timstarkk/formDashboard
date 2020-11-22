import React, {useContext} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import './DeployForm.css';

export default function DeployForm(props) {
    let formId = props.formId;

    const findInDatabase = async () => {
        // await return of database query

        // need to consider what the page will render
        // while this functjion is running.
        // need to display a loading icon during that time.

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

        // as you can see, the above query requires a ${userId};
        // since this component will render on random visitors browsers,
        // there will be no logged in user to pull userId from.
        //
        // for this reason, i need all forms to live top level in dynamoDB
        // this way i can query any form directly with the formId.

        // This change might require that i rewrite the query and mutations
        // that live in context. (in context, instead of using userId to find the form,
        // I can use userId to verify that the current logged in user is the owner of /// the form before allowing the mutations.)
        // will need to store the userId into each form under variable 'owner' like so:
        // owner: userId



        // form might need to be its own
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