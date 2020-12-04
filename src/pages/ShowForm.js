import React from 'react';
import DeployForm from '../components/DeployForm/DeployForm';

export default function ShowForm(props) {
    let formId = props.match.params.slug;
    return (
        <>
            <DeployForm formId={formId}/>
            <p>hello from showform</p>
        </>
    )
}
