import React, { Component } from 'react';
import { ItemContext } from '../../context';
import { Auth } from 'aws-amplify';
import './Dashboard.css';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';
import Form from '../Form/Form';
import FormThumbnail from '../FormThumbnail/FormThumbnail';
import FullForm from '../FullForm/FullForm';
import Switch from "react-switch";


export default class Dashboard extends Component {
    _isMounted = false;
    static contextType = ItemContext;

    state = {
        isLoggedIn: false,
        forms: [],
        openSwitch: false
    }

    async componentDidMount() {
        this._isMounted = true;
        let that = this;
        // check if user is logged in, and set state accordingly
        this.checkLoginGetForms(that);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async checkLoginGetForms(that) {
        await Auth.currentSession()
            .then(async data => {
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

    handleAddForm() {
        let that = this;

        this.handleAddFormAsync(that);
    }

    handleGlobalProperties() {
        let that = this;

        // this.handleAddFormAsync(that);
        console.log('hello from global properties')
    }

    async handleAddFormAsync(that) {
        const { addFormButton, forms } =   that.context;
        await addFormButton(); 
        // await that.formGetter(that);
        // let forms = that.state.forms;
        that.setState({
            forms
        }, () => {console.log('forcing update');that.forceUpdate()})
    };

    async formGetter(that) {
        const { getForms } = this.context;

        let forms = await getForms();
        that.setState({
            forms
        })
    };

    handleSwitch(openSwitch) {
        const { toggleForm } = this.context;

        toggleForm();
        this.setState({ openSwitch: !openSwitch });
    };

    render() {
        let forms = null;
        let { addGridItem } = this.context;

        forms = this.context.forms;
        

        console.log('dashboard renderrrrrr')
        return (
            <>
            {this.state.isLoggedIn
                ? 
                <section className="dashboard-section">
                    <div className="container-wrapper">
                        <div className="header-wrapper">
                            <h4 id='dashboard-header'>Dashboard</h4>
                        </div>
                        <div id="form-toggle-button-container">
                            <div id="form-toggle-button">
                                <Switch 
                                    onChange={() => this.handleSwitch(this.state.openSwitch)} 
                                    checked={this.state.openSwitch} 
                                    height={18}
                                    width={38}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                /> 
                            </div>
                        </div>
                        <div className='dashboard-container'>
                            <div id='forms-list'>
                                {
                                forms.map(form => {return <FormThumbnail key={form.id} form={form}/>})
                                }
                            </div>
                            <div className='btn btn-primary plus-button' onClick={() => {this.handleAddForm()}}>
                                <p>+</p>
                            </div>
                            <div className='btn btn-primary plus-button' onClick={addGridItem}>
                                <p>g</p>
                            </div>
                            <div className='btn btn-primary plus-button' onClick={() => {this.handleGlobalProperties()}}>
                                <p>f</p>
                            </div>
                        </div>
                        <FullForm />
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
