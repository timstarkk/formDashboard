import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

export default class Dashboard extends Component {
    static contextType = ItemContext;
    render() {
        let { loading, shopItems: items } = this.context;

        items = items.map(item => {
            return <Item key={item.id} item={item} />
        });

        return (
            <>
                <section className="dashboard-section">
                    <h4>Dashboard</h4>
                    <div className='line'></div>
                </section>
            </>
        )
    }
}
