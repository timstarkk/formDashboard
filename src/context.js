import React, { Component, createRef } from 'react';
import query from './data';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import config from './aws-exports';
import { getDefaultNormalizer } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { FiSettings as SettingsIcon } from "react-icons/fi";

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
        labels: []
    };

    async componentDidMount() {
        await API.graphql(graphqlOperation(query))
            .then(data => {
                let tempItems = data.data.listStoreItems.items;

                for (let i = 0; i < tempItems.length; i++) {
                    if (items.length === 0) {
                        items.push(tempItems[i]);
                    } else {
                        for (let j = 0; j < items.length; j++) {
                            if (tempItems[i].fields.price < items[j].fields.price) {
                                items.splice(j, 0, tempItems[i]);
                                break;
                            } else if (tempItems[i].fields.price > items[j].fields.price && j === (items.length - 1)) {
                                items.push(tempItems[i])
                            }
                        }
                    }
                }
            })

        let shopItems = this.formatData(items);
        let featuredItems = shopItems.filter(item => item.featured === true)
        let maxPrice = Math.max(...shopItems.map(item => item.price));
        this.setState({
            shopItems,
            featuredItems,
            sortedItems: shopItems,
            loading: false,
            price: maxPrice,
            maxPrice
        })
    };

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

        API.graphql(graphqlOperation(addForm)).then(async res => {console.log('form add successful!'); await this.getForms()}).catch(err => console.log(err));
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
        console.log(form);
        let layout = form.contents.layout;
        console.log(layout);
        let types = [];
        let labels = [];
        for(const i of layout) {
            types.push(i.type);
            labels.push({isLabel: i.isLabel, labelFor: i.labelFor})
        };
        console.log(types);
        this.setState({
            selectedForm: form,
            formSelected: true,
            layouts: {
                lg: layout
            },
            types,
            labels
        })
    }

    handleHover = (e, left) => {
        if (left) {
            let settingsButtons = document.getElementsByClassName('item-settings-button');
            for (const i of settingsButtons) {
                if(i.classList.contains('show')) {
                    i.classList.remove('show');
                }
            }
        } else {
            if (e.target !== null) {
                // check if e.target is the settingsButton already.
                if (e.target.classList.contains('item-settings-button')){
                    // the target is already an <a>
                    if (!e.target.classList.contains('show')){
                        e.target.classList.add('show');
                    } else {
                        e.target.classList.remove('show');
                    }
                } else if (e.target.classList.contains('grid-item')) {
                    let settingsButton = e.target.querySelector('a');
                    if (!settingsButton.classList.contains('show')) {
                        settingsButton.classList.add('show');
                    } else {
                        settingsButton.classList.remove('show');
                    }
                }
            }
        }
    }

    displayForm = () => {
        const items = [];

        for (const i of this.state.layouts.lg) {
          items.push(
            <div id={`grid-item-${i.i}`} 
            onMouseEnter={e => this.handleHover(e, false)} 
            onMouseLeave={e => this.handleHover(e, true)} 
            className={`grid-item`} 
            key={i.i}>

                <input type={i.type} />

                <a id={`item-settings-button-${i.i}`} 
                className={`item-settings-button`} 
                onClick={() => {
                    this.toggleToolbox(i.i);
                }}>
                    <SettingsIcon id="settings-icon" />
                </a>
            </div>
        )
        }

        return(
            [items]
        )
    };

    updateLayouts = (layout) => {
        console.log(layout);
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
        let updatedForm = {
            id: formId,
            contents: {
                columns: 0,
                rows: 0,
                layout: layout
            }
        };

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
        API.graphql(graphqlOperation(updateLayout)).then(async res => {console.log('update successful!'); await this.getForms()}).catch(err => console.log(err));
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
        }, () => {this.updateLayouts(layout)})
        ;
    };

    addGridItem = () => {
        console.log('hello from add grid item');
    };


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
                updateLayouts: this.updateLayouts,
                chooseType: this.chooseType,
                addGridItem: this.addGridItem
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