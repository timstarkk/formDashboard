import React from 'react'
import './Hero.css'

export default function Hero({ children, hero }) {
    return <header className={hero} id="top">{children}</header>;
}


Hero.defaultProps = {
    hero: 'defaultHero'
}