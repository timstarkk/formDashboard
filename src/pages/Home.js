import React from 'react'
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import Banner from '../components/Banner/Banner';
import Featured from '../components/Featured/Featured';
import Intro from '../components/Intro/Intro';
import Footer from '../components/Footer/Footer';

export default function Home() {
    return (
        <>
            <Hero>
                <Banner title="Latest" subtitle="soles and laces">
                    <Link to='/store'>
                        <div className="btn btn-primary">shop now</div>
                    </Link>
                </Banner>
            </Hero>
            <Intro />
            <Featured />
            <Footer />
        </>
    )
}
