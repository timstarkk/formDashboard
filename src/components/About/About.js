import React from 'react'
import './About.css';

export default function About() {
    return (
        <div className="about-section">
            <h4>About This Site</h4>
            <div className='line'></div> 
            <div className="container-wrapper">
                <p>A serverless E-commerce website built with React.js and AWS Cloud.<br />AWS services used include Amplify, Cognito, AppSync, DynamoDB, and S3.<br />
                    The shopping cart was built without libraries, and includes cart persistence during user sign-in. <br /><br />
                    This website is an example and is not intended to actually sell products.<br />For this reason, the checkout button currently has no functionality.</p>
            </div>
        </div>
    )
}
