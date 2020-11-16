import React from 'react';
import './DeployForm.css';

export default function DeployForm(props) {
    let formId = props.formId;

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