import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ItemContext } from '../../context';
import { Auth } from 'aws-amplify';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';
import FormThumbnail from '../FormThumbnail/FormThumbnail';

export default class Dashboard extends Component {
    _isMounted = false;
    static contextType = ItemContext;
    state = {
        isLoggedIn: false,
        forms: [],
        switch: false
    }

    async componentDidMount() {
        this._isMounted = true;
        console.log(this);
        let that = this;
        // check if user is logged in, and set state accordingly
        await Auth.currentSession()
            .then(async data => {
                console.log(data);
                console.log('user logged in');

                this.formGetter(that);

                that.setState({
                    isLoggedIn: true
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoggedIn: false
                })
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async formGetter(that) {
        const { getForms } = this.context;

        let forms = await getForms();
        console.log(forms);
        that.setState({
            forms
        })
    }

    handleAddForm() {
        // console.log('hello bros');
        // let that = this;
        // this.formGetter(that);

        const element = (
            <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
        ReactDOM.render(element, document.getElementById('root'));
    }

    render() {
        let { loading, addFormButton } = this.context;
        let forms = null;

        if (this.state.isLoggedIn) {
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
                            <div className='btn btn-primary' id='add-button' onClick={() => {addFormButton(); this.handleAddForm();}}>+</div>
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
