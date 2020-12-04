import React, {useContext} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ItemContext } from '../../context';
import './DeployForm.css';

export default function DeployForm(props) {
    let formId = props.formId;
    const { handleDeployForm }  = useContext(ItemContext);

    const findInDatabase = async () => {
        // await return of database query

        // need to consider what the page will render
        // while this functjion is running.
        // need to display a loading icon during that time.

        let form = await handleDeployForm(formId);
        console.log(form)
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
            <div class="fullForm">
                <button value="click me" onClick={() => findInDatabase()} >hello</button>
            </div>
        )
    }
}


// might need ReactDOM.render();