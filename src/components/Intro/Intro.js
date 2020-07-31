import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import Title from '../Title/Title';
import Image from '../../images/sneakerImage.jpeg';

export default function Intro() {
    return (
        <section className="intro-section">
            <Title title="what you really want to wear" />
            <div className="intro-text-container">
                <p>
                    Don't wait for the crowd. Get the sneakers that fit your style. We have the latest and greatest pieces for you to add to your collection and show yourself off.
                </p>
            </div>
            <div className="intro-feature">
                <img src={Image} alt="dsfasd" />
                <div className="intro-feature-text">
                    <h4>only the best</h4>
                    <p>Our selection is handpicked from across the world by a seasoned team of individuals who have a proven taste for the highest quality footwear. We look and find the hidden gems, so you don't have to.</p>
                    <div className="btn-container">
                        <Link to="/store">
                            <div className="btn btn-primary">get some</div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
