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
        isLoggedIn: false,
        forms: []
    }

    async componentDidMount() {
        let that = this;
        
        const { getForms } = this.context;
        
        // check if user is logged in, and set state accordingly
        await Auth.currentSession()
            .then(async data => {
                console.log(data);
                console.log('user logged in');
                let tempFunc = async function() {
                    let forms = await getForms();
                    that.setState({
                        isLoggedIn: true,
                        forms
                    });
                };

                tempFunc();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoggedIn: false
                })
            });


        // let forms = getForms();

        // console.log(forms);

        // let forms = await getForms();

        // this.setState({
        //     forms
        // })
    }

    render() {
        let { loading, addFormButton } = this.context;

        let forms = null;

        if (this.state.isLoggedIn) {
            console.log(this.state);
            forms = this.state.forms
    
            forms = forms.map(form => {
                return <FormThumbnail key={form.id} form={form}/>
            });
        }

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
