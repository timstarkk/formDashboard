import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Products.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

export default class Products extends Component {
    static contextType = ItemContext;
    render() {
        let { loading, shopItems: items } = this.context;

        items = items.map(item => {
            return <Item key={item.id} item={item} />
        });

        return (
            <section className="products-section">
                <h4>products</h4>
                <div className='line'></div>
                <div className="featured-section">
                    <div className="container-wrapper">
                        <section className="featured-container">
                            <div className="featured-items-center">
                                {loading ? <Loading /> : items}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}
