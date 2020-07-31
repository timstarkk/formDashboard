import React from 'react';
import { Link } from 'react-router-dom';
import defaultImg from '../../images/placeholder480.jpg';
import PropTypes from 'prop-types';

export default function Item({ item }) {
    const { name, slug, images, price } = item;
    return (
        <article className="item">
            {/* <Link to={`/rooms/${slug}`}> */}
            <Link to={`/store/${slug}`} className="img-container link">
                <img src={images[0] || defaultImg} alt="item option" />
                <div className="price-top">
                    <h6>{name} - ${price}</h6>
                </div>
            </Link>
            {/* </Link> */}
        </article>
    )
};

Item.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired
    })
};