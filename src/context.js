import React, { Component, createRef } from 'react';
import query from './data';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import config from './aws-exports';
import { getDefaultNormalizer } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { FiSettings as SettingsIcon, FiXCircle as XIcon } from "react-icons/fi";

// import mutations from graphql
import { nameOfMutation } from './graphql/mutations';

Amplify.configure(config);
const ItemContext = React.createContext();
let items = [];

class ItemProvider extends Component {

    state = {
        loading: true,
        type: 'all',
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        currentUser: {},
        addAmount: 1,
        amount: 0,
        hideFormsList: true,
        toolboxVisible: false,
        cartItemsData: [],
        cartId: '',
        isLoggedIn: false,
        forms: [],
        formSelected: false,
        selectedForm: '',
        selectedGridItem: '',
        layouts: {
            lg: [
                {i: 'a', x: 0, y: 0, w: 12, h: 4},
                {i: 'b', x: 0, y: 1, w: 6, h: 4},
                {i: 'c', x: 6, y: 1, w: 6, h: 4},
                {i: 'd', x: 0, y: 2, w: 12, h: 4}
                ]
        },
        types: [],
        labels: [],
        properties: []
    };

    // async componentDidMount() {
    //     await API.graphql(graphqlOperation(query))
    //         .then(data => {
    //             let tempItems = data.data.listStoreItems.items;

    //             for (let i = 0; i < tempItems.length; i++) {
    //                 if (items.length === 0) {
    //                     items.push(tempItems[i]);
    //                 } else {
    //                     for (let j = 0; j < items.length; j++) {
    //                         if (tempItems[i].fields.price < items[j].fields.price) {
    //                             items.splice(j, 0, tempItems[i]);
    //                             break;
    //                         } else if (tempItems[i].fields.price > items[j].fields.price && j === (items.length - 1)) {
    //                             items.push(tempItems[i])
    //                         }
    //                     }
    //                 }
    //             }
    //         })

    //     let shopItems = this.formatData(items);
    //     let featuredItems = shopItems.filter(item => item.featured === true)
    //     let maxPrice = Math.max(...shopItems.map(item => item.price));
    //     this.setState({
    //         shopItems,
    //         featuredItems,
    //         sortedItems: shopItems,
    //         loading: false,
    //         price: maxPrice,
    //         maxPrice
    //     })
    // };

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.id;
            let images = item.fields.images.map(images => images.imageFields.file.url);
            let tempItem = { ...item.fields, images, id }

            return tempItem
        });

        return tempItems;
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    };

    setCurrentUser = userInfo => {
        this.setState({
            currentUser: userInfo,
            isLoggedIn: true
        });

    };

    afterSignOut = () => {
        this.setState({
            isLoggedIn: false
        })
    };

    toggleForm = () => {
        this.setState({
            hideFormsList: !this.state.hideFormsList
        });
    };

    toggleToolbox = (selectedGridItem) => {
        let settingsButtons = document.getElementsByClassName('item-settings-button');

        for (const i of settingsButtons) {
            if(i.classList.contains('show')) {
                i.classList.remove('show');
            }
        }

        this.setState({
            toolboxVisible: !this.state.toolboxVisible,
            selectedGridItem
        });
    };

    addFormButton = () => {
        let that = this;
        this.addFormFunction(that);
    };

    async addFormFunction(that) {
        let uuid = uuidv4();
        const userId = that.state.currentUser.sub
        let forms = await that.getForms();
        let newForm = {
            id: uuid,
            contents: {
                columns: 9,
                rows: 9,
                layout: [
                    {i: 'a', x: 0, y: 0, w: 12, h: 4, type: "text", isLabel: false},
                    {i: 'b', x: 0, y: 1, w: 6, h: 4, type: "radio", isLabel: false},
                    {i: 'c', x: 6, y: 1, w: 6, h: 4, type: "radio", isLabel: false},
                    {i: 'd', x: 0, y: 2, w: 12, h: 4, type: "text", isLabel: false}
                ]
            }
        };

        forms.push(newForm);
        
        let stringifiedItems = JSON.stringify(forms);
        let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');

        const addForm = `
            mutation {
                updateUser(input: {
                    id: "${userId}",
                    forms: ${unquotedItems}
                }) {
                    id forms { id, contents { columns, rows, layout { h, i, moved, static, w, x, y, type, isLabel } } }
                }
            }
        `
        
        // mutation for Form model
        const addFormForm = `
            mutation {
                createForms(input: {
                    id: "${uuid}",
                    form: ${unquotedItems}
                }) {
                    id form { id, contents { columns, rows, layout { h, i, moved, static, w, x, y, type, isLabel } } }
                }
            }
        `

        API.graphql(graphqlOperation(addForm)).then(async res => {
            console.log('form add successful!'); await this.getForms()
            .then(async res => API.graphql(graphqlOperation(addFormForm)).then(res => console.log('formform add successful!')).catch(err => console.log(err)))   
        }).catch(err => console.log(err));
        // add to forms
    };

    getForms = () => {
        let that = this;

        return this.getFormsAsync(that);
    };

    async getFormsAsync(that) {
        // return [{id: '1', content: 'forms'}];
        const userId = that.state.currentUser.sub;

        const getForms = `
        query {
            getUser(id: "${userId}") {
                forms {
                    id
                    contents {
                        columns
                        rows
                        layout {
                            h
                            i
                            isBounded
                            isDraggable
                            isResizable
                            maxH
                            maxW
                            minH
                            minW
                            moved
                            resizeHandles
                            static
                            w
                            x
                            y
                            type
                            isLabel
                            labelFor
                            textValue
                        }
                    }
                }
            }
        }
        `

        let forms = await API.graphql(graphqlOperation(getForms)).then(res => {return res.data.getUser.forms}).catch(error => console.log(error.message));
        

        this.setState({
            forms
        }, () => {
        })
        return forms;
    };

    handleSelectForm = (form) => {
        let layout = form.contents.layout;
        let types = [];
        let labels = [];
        let properties = [];
        for(const i of layout) {
            types.push(i.type);
            labels.push({isLabel: i.isLabel, labelFor: i.labelFor, textValue: i.textValue});
            properties.push({
                placeholder: i.placeholder,
                height: i.height,
                width: i.width,
                defaultValue: i.defaultValue,
                borderWidth: i.borderWidth,
                borderColor: i.borderColor,
                borderRadius: i.borderRadius,
                textboxColor: i.textboxColor,
                textColor: i.textColor,
                fontSize: i.fontSize,
                fontFamily: i.fontFamily
            });
        };
        
        this.setState({
            selectedForm: form,
            formSelected: true,
            layouts: {
                lg: layout
            },
            types,
            labels,
            properties
        })
    }

    handleHover = (e, left) => {
        if (left) {
            let hoverButtons = document.getElementsByClassName('item-hover-button');
            for (const i of hoverButtons) {
                if(i.classList.contains('show')) {
                    i.classList.remove('show');
                }
            }
        } else {
            if (e.target !== null) {
                // check if e.target is the settingsButton already.
                if (e.target.classList.contains('item-hover-button')){
                    // the target is already an <a>
                    if (!e.target.classList.contains('show')){
                        e.target.classList.add('show');
                    } else {
                        e.target.classList.remove('show');
                    }
                } else if (e.target.classList.contains('grid-item')) {
                    let hoverButtons = e.target.querySelectorAll('a');
                    for (const i of hoverButtons) {
                        if (!i.classList.contains('show')) {
                            i.classList.add('show');
                        } else {
                            i.classList.remove('show');
                        }
                    }
                }
            }
        }
    }

    displayForm = () => {
        const items = [];

        for (const i of this.state.layouts.lg) {
            // check if item has a defined type //
            if(i.type === 'none'){
                // item has no type
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    onMouseEnter={e => this.handleHover(e, false)} 
                    onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>

                    </div>
                )
            } else if (i.type === 'textbox') {
                let textValue = i.textValue;
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    onMouseEnter={e => this.handleHover(e, false)} 
                    onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <p>{textValue ? textValue : 'text'}</p>

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>
                    </div>
                )
            } else {
                // item has a type
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    onMouseEnter={e => this.handleHover(e, false)} 
                    onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <input type={i.type} />

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>
                    </div>
                )
            }
        }

        return(
            [items]
        )
    };

    displayDeployedForm = () => {
        const items = [];

        for (const i of this.state.layouts.lg) {
            // check if item has a defined type //
            if(i.type === 'none'){
                // item has no type
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    // onMouseEnter={e => this.handleHover(e, false)} 
                    // onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>

                    </div>
                )
            } else if (i.type === 'textbox') {
                let textValue = i.textValue;
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    // onMouseEnter={e => this.handleHover(e, false)} 
                    // onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <p>{textValue ? textValue : 'text'}</p>

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>
                    </div>
                )
            } else {
                // item has a type
                items.push(
                    <div id={`grid-item-${i.i}`} 
                    // onMouseEnter={e => this.handleHover(e, false)} 
                    // onMouseLeave={e => this.handleHover(e, true)} 
                    className={`grid-item`} 
                    key={i.i}>

                        <input type={i.type} />

                        <a id={`item-settings-button-${i.i}`} 
                        className={`item-hover-button item-settings-button`} 
                        onClick={() => {
                            this.toggleToolbox(i.i);
                        }}>
                            <SettingsIcon id="settings-icon" />
                        </a>

                        <a id={`item-delete-button-${i.i}`} 
                        className={`item-hover-button item-delete-button`} 
                        onClick={() => {
                            this.deleteGridItem(i.i);
                        }}>
                            <XIcon id="delete-icon" />
                        </a>
                    </div>
                )
            }
        }

        return(
            [items]
        )
    };

    updateLayouts = (layout) => {
        let that = this;
        let formId = this.state.selectedForm.id

        this.setState({
            layouts: {
                lg: layout
            }
        }, () => {this.updateLayoutsAsync(that, layout, formId)})
    };

    async updateLayoutsAsync(that, layout, formId) {
        const userId = this.state.currentUser.sub
        let forms = await that.getForms();
        console.log(forms);
        let updatedForm = {
            id: formId,
            contents: {
                columns: 0,
                rows: 0,
                layout: layout
            }
        };
        
        let stringifiedItemsSingle = JSON.stringify([updatedForm]);
        let unquotedItemsSingle = stringifiedItemsSingle.replace(/"([^"]+)":/g, '$1:');

        let updatedForms = forms.map(form => {
            if (form.id === formId) {
                return updatedForm;
            } else {
                return form;
            }
        })

        let stringifiedItems = JSON.stringify(updatedForms);
        let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');

        const updateLayout = `
            mutation {
                updateUser(input: {
                    id: "${userId}",
                    forms: ${unquotedItems}
                }) {
                    id forms { id, contents { columns, rows, layout { h, i, moved, static, w, x, y, type } } }
                }
            }
        `

        // updates layout for Form model
        const updateLayoutForm = `
            mutation {
                updateForms(input: {
                    id: "${formId}",
                    form: ${unquotedItemsSingle}
                }) {
                    id form { id, contents { columns, rows, layout { h, i, moved, static, w, x, y, type } } }
                }
            }
        `

        API.graphql(graphqlOperation(updateLayout)).then(async res => {
            console.log('update layout successful!'); await this.getForms()
            .then(async res => API.graphql(graphqlOperation(updateLayoutForm)).then(res => console.log('update layout in form model successful!')).catch(err => console.log(err)))   
        }).catch(err => console.log(err));
        // add to forms
    }

    chooseType = (newType) => {
        let gridItemLetter = this.state.selectedGridItem;
        let types = [];
        let layout = this.state.layouts.lg.map(i => {
            if (i.i === gridItemLetter) {
                i.type = newType
            }

            types.push(i.type);
            return i;
        });
        
        this.setState({
            layouts: {
                lg: layout
            },
            types
        }, () => {this.updateLayouts(layout)});
    };

    addGridItem = () => {
        let uuid = uuidv4();
        let layout = this.state.layouts.lg;
        let types = this.state.types;
        let labels = this.state.labels;
        let properties = this.state.properties;
        let blankItem = {
            h: 4,
            i: `${uuid}`,
            isBounded: false,
            isDraggable: true,
            isLabel: false,
            isResizable: true,
            labelFor: undefined,
            textValue: undefined,
            maxH: Infinity,
            maxW: Infinity,
            minH: 0,
            minW: 0,
            moved: false,
            resizeHandles: null,
            static: false,
            type: 'none',
            w: 12,
            x: 0,
            y: 99,
            placeholder: undefined,
            height: undefined,
            width: undefined,
            defaultValue: undefined,
            borderWidth: undefined,
            borderColor: undefined,
            borderRadius: undefined,
            textboxColor: undefined,
            textColor: undefined,
            fontSize: undefined,
            fontFamily: undefined
        };
        types.push('none');
        layout.push(blankItem);
        labels.push({isLabel: false, labelFor: undefined, textValue: undefined});
        // set default properties
        properties.push({
            placeholder: undefined,
            height: undefined,
            width: undefined,
            defaultValue: undefined,
            borderWidth: undefined,
            borderColor: undefined,
            borderRadius: undefined,
            textboxColor: undefined,
            textColor: undefined,
            fontSize: undefined,
            fontFamily: undefined
        });
        
        this.setState({
            layouts: {
                lg: layout
            },
            types,
            properties
        }, () => {console.log('state changed');this.updateLayouts(layout)});
    };

    deleteGridItem = (gridItem) => {
        let types = [];
        let labels = [];

        let layout = this.state.layouts.lg.filter((i, index) => {
            console.log(i);
            console.log(index);
            if (i.i === gridItem) {
                // do nothing
                console.log('do nothing, found it');
            } else {
                types.push(i.type);
                labels.push({isLabel: i.isLabel, labelFor: i.labelFor, textValue: i.textValue})
                return i;
            }
        });

        // set the new layout in state and call updateLayouts
        this.setState({
            layouts: {
                lg: layout
            },
            types,
            labels
        }, () => {console.log('state changed');this.updateLayouts(layout)});
    };

    renderToolbox = () => {
        // conditional statement that checks if the selected box has an assigned type or not
        let selectedGridItem = this.state.selectedGridItem;
        let selectedType = '';

        // grab selected item type
        for (const i of this.state.layouts.lg) {
            if (i.i === selectedGridItem) {
                selectedType = i.type;
            }
        }

        if (selectedType) {
            return selectedType;
        } else {
            return undefined;
        };
    };

    updateTextValue = (value) => {
        let labels = this.state.labels;
        let layout = this.state.layouts.lg;
        // need selected item.
        let selectedGridItem = this.state.selectedGridItem;

        // loop through layouts until i.i === selectedGridItem;
        for (const [index, i] of layout.entries()) {
            if (i.i === selectedGridItem) {
                i.textValue = value;
                labels[index].textValue = value;
            };
        };

        this.setState({
            layouts: {
                lg: layout
            },
            labels
        }, () => {console.log('state changed');this.updateLayouts(layout)});
    };

    handleFormSubmit = (event) => {
        let formContents = [];
        let layout = this.state.layouts.lg;
        let counter = 0;

        // need to grab all the grid items with a document.queryselectorall('grid-item')
        let gridItems = document.getElementsByClassName('grid-item');
        let fullForm = document.getElementById('full-form-container');

        // this looks for inputs and p in each grid item, pushing to array even when not found
        for (const i of gridItems) {
            let tempArray = [];

            tempArray.push({
                input: i.querySelectorAll('input'),
                i: layout[counter].i,
                x: layout[counter].x,
                y: layout[counter].y
            });
            tempArray.push({
                p: i.querySelectorAll('p'),
                i: layout[counter].i,
                x: layout[counter].x,
                y: layout[counter].y
            });
            
            counter ++;

            // this grabs only those inputs and p's which actually exist (might add condition to above loop instead)
            if (tempArray[0].input.length > 0) {
                formContents.push(tempArray[0]);
            } else if (tempArray[1].p.length > 0) {
                formContents.push(tempArray[1]);
            };
        };

        // sort formContents array according to position on screen (based on y, and x position)
        let organizedFormContents = formContents.sort((a, b) => {
            if (a.y < b.y) return -1;
            if (a.y > b.y) return 1;

            if (a.x < b.x) return -1;
            if (a.x > b.x) return 1;
        });

        for(const i of organizedFormContents) {
            if (i.hasOwnProperty('input')) {
                let inputType = i.input[0].type;

                if (inputType === 'text') {
                    console.log(i.input[0].value);
                } else if (inputType === 'radio') {
                    console.log(i.input[0].checked);
                } else if (inputType === 'checkbox') {
                    console.log(i.input[0].checked);
                };
            } else if (i.hasOwnProperty('p')) {
                // grabs inner text of <p> element
                console.log(i.p[0].innerText);
            }
        };

        // need to convert to a string?
        // am i sending HTML in the email?

        // call async that calls lambda function
        // this.callLambda();

    };

    handleDeployForm = async (formId) => {
        console.log('hello from handleDeployForm')

        const getForm = `
            query {
                getForms(id: "${formId}") {
                    form {
                        id
                        contents {
                            columns
                            rows
                            layout {
                                h
                                i
                                isBounded
                                isDraggable
                                isResizable
                                maxH
                                maxW
                                minH
                                minW
                                moved
                                resizeHandles
                                static
                                w
                                x
                                y
                                type
                                isLabel
                                labelFor
                                textValue
                            }
                        }
                    }
                }
            }
        `

        let form = await API.graphql(graphqlOperation(getForm)).then(res => {console.log('yes its in here');return res.data.getForms.form}).catch(error => console.log(error.message));
        this.setState({
            forms: form,
            layouts: {
                lg: form[0].contents.layout
            }
        })
    };

    async callLambda() {
        await API.graphql({ query: nameOfMutation, variables: {someVar: 'foo', otherVar: 'bar'}})
        .then(res => { console.log(res) });
    }

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                setCurrentUser: this.setCurrentUser,
                handleChange: this.handleChange,
                toggleForm: this.toggleForm,
                toggleToolbox: this.toggleToolbox,
                afterSignOut: this.afterSignOut,
                addFormButton: this.addFormButton,
                getForms: this.getForms,
                handleSelectForm: this.handleSelectForm,
                displayForm: this.displayForm,
                displayDeployedForm: this.displayDeployedForm,
                updateLayouts: this.updateLayouts,
                chooseType: this.chooseType,
                addGridItem: this.addGridItem,
                deleteGridItem: this.deleteGridItem,
                renderToolbox: this.renderToolbox,
                updateTextValue: this.updateTextValue,
                handleFormSubmit: this.handleFormSubmit,
                handleDeployForm: this.handleDeployForm
            }}>
                {this.props.children}
            </ItemContext.Provider>
        )
    };
}


const ItemConsumer = ItemContext.Consumer;

export function withItemConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <ItemConsumer>
            {value => <Component {...props} context={value} />}
        </ItemConsumer>
    }
};

export { ItemProvider, ItemConsumer, ItemContext }