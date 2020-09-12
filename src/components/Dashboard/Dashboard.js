import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Auth } from 'aws-amplify';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';
import FormThumbnail from '../FormThumbnail/FormThumbnail';

export default class Dashboard extends Component {
    static contextType = ItemContext;

    state = {
        isLoggedIn: false
    }

    async componentDidMount() {
        // check if user is logged in, and set state accordingly
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
        let { loading, forms, addFormButton } = this.context;

        forms = forms.map(form => {
            return <FormThumbnail key={form.id} form={form}/>
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
                                {forms}
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
