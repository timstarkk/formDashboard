import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Featured.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Title from '../Title/Title';

export default class Featured extends Component {
    static contextType = ItemContext;
    render() {
        let { loading, featuredItems: items } = this.context;

        items = items.map(item => {
            return <Item key={item.id} item={item} />
        });

        return (
            <div className="featured-section">
                <div className="container-wrapper">
                    <section className="featured-container">
                        <Title title="featured selection" />
                        <div className="featured-items-center">
                            {loading ? <Loading /> : items}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
