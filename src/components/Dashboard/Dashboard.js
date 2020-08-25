import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';

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
                    <div className="container-wrapper">
                        <h4>Dashboard</h4>
                        <div className='line'></div>
                        <div className='dashboard-container'>
                            <div className='btn btn-primary' id='add-button'>+</div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
