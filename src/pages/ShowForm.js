import React from 'react';
import Footer from '../components/Footer/Footer';
import DeployForm from '../components/DeployForm/DeployForm';

export default function ShowForm(props) {
    let formId = props.match.params.slug;
    return (
        <>
            <DeployForm formId={formId}/>
            <p>hello from showform</p>
            <Footer />
        </>
    )
}
