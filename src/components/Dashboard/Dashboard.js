import React, { Component } from 'react';
import { ItemContext } from '../../context';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';

export default class Dashboard extends Component {
    static contextType = ItemContext;
    render() {
        let { loading, shopItems: items, addFormButton } = this.context;

        items = items.map(item => {
            return <Item key={item.id} item={item} />
        });

        return (
            <>
                <section className="dashboard-section">
                    <div className="container-wrapper">
                        <div className="header-wrapper">
                            <h4 id='dashboard-header'>Dashboard</h4>
                        </div>
                        <div className='dashboard-container'>
                            <p>add form:</p>
                            <div className='btn btn-primary' id='add-button' onClick={addFormButton}>+</div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
