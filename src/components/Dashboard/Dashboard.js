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
        console.log('componentDidMount mount mount mount')
        this._isMounted = true;
        console.log(this);
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

    handleAddForm() {
        let that = this;

        this.handleAddFormAsync(that);
    }

    async handleAddFormAsync(that) {
        console.log('handleAddForm');
        const { addFormButton } =   that.context;
        await addFormButton(); 
        await that.formGetter(that);
        console.log(that.state);
        let forms = that.state.forms;
        that.setState({
            forms
        }, () => that.forceUpdate())
    };

    async formGetter(that) {
        const { getForms } = this.context;

        let forms = await getForms();
        console.log(forms);
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
        console.log("renderingggggggggg");
        // let { loading, addFormButton } = this.context;
        let forms = null;

        forms = this.context.forms;
        // why are all these versions of forms different?
        console.log(forms); // returns [array(9)]
        // forms = forms.map(form => {
        //     return <FormThumbnail key={form.id} form={form}/>
        // });

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
                                {forms}
                            </div>
                            <div className='btn btn-primary' id='add-button' onClick={() => {this.handleAddForm()}}>
                                <p>+</p>
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
