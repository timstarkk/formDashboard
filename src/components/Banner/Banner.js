import React from 'react';
import './Banner.css';

export default function Banner({ children, title, subtitle }) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <p className="banner-subtitle">{subtitle}</p>
            {children}
        </div>
    )
}