import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Auth } from 'aws-amplify';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';

export default class Dashboard extends Component {
    static contextType = ItemContext;

    state = {
        isLoggedIn: false
    }

    async componentDidMount() {
        Auth.currentSession()
            .then(data => {
                console.log('user logged in');
                this.setState({
                    isLoggedIn: true
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoggedIn: false
                })
            });
    }

    render() {
        let { loading, shopItems: items, addFormButton } = this.context;

        items = items.map(item => {
            return <Item key={item.id} item={item} />
        });

        return (
            <>
            {this.state.isLoggedIn
                ? 
                <section className="dashboard-section">
                    <div className="container-wrapper">
                        <div className="header-wrapper">
                            <h4 id='dashboard-header'>Dashboard</h4>
                        </div>
                        <div className='dashboard-container'>
                            <div id='formsList'>

                            </div>
                            <div className='btn btn-primary' id='add-button' onClick={addFormButton}>+</div>
                        </div>
                    </div>
                </section>
                :
                <section className="dashboard-section">
                    <div className="container-wrapper">
                        <div className="header-wrapper">
                            <h4 id='dashboard-header'>Dashboard</h4>
                        </div>
                        <div className='dashboard-container'>
                            <p>please sign in to view dashboard...</p>
                        </div>
                    </div>
                </section>
            }
            </>
        )
    }
}
