import React from 'react';
import './Banner.css';

export default function Banner({ children, title, subtitle }) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            {/* <p className="banner-subtitle">{subtitle}</p> */}
            {/* <div className="social">
                <a href="https://www.linkedin.com/in/tim-stark-00722a113/" className="icon-button" target="_blank">
                    <FaLinkedin />
                </a>
                <a href="https://www.github.com/timstarkk/" className="icon-button" target="_blank">
                    <FaGithub />
                </a>
            </div> */}
            {children}
        </div>
    )
}