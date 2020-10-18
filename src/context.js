import React, { Component } from 'react';
import query from './data';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import config from './aws-exports';
import { getDefaultNormalizer } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

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
        hideToolbox: true,
        cartItemsData: [],
        cartId: '',
        isLoggedIn: false,
        forms: [],
        formSelected: false,
        selectedForm: '',
        layouts: {
            // default layouts object
            lg: [
                {i: 'a', x: 0, y: 0, w: 12, h: 4},
                {i: 'b', x: 0, y: 1, w: 6, h: 4},
                {i: 'c', x: 6, y: 1, w: 6, h: 4},
                {i: 'd', x: 0, y: 2, w: 12, h: 4}
                ]
        }
    };

    async componentDidMount() {
        await API.graphql(graphqlOperation(query))
            .then(data => {
                let tempItems = data.data.listStoreItems.items;

                for (let i = 0; i < tempItems.length; i++) {
                    console.log(i);
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

        console.log('handling event');
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
            hideToolbox: !this.state.hideToolbox
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
                elements: [
                    {
                        type: "timbo",
                        start: 9,
                        end: 9
                    }
                ]
            }
        };

        forms.push(newForm);
        console.log(forms);
        
        let stringifiedItems = JSON.stringify(forms);
        console.log(stringifiedItems);
        let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');
        console.log(unquotedItems);

        const addForm = `
            mutation {
                updateUser(input: {
                    id: "${userId}",
                    forms: ${unquotedItems}
                }) {
                    id forms { id, contents { columns, rows, elements { type, start, end } } }
                }
            }
        `

        API.graphql(graphqlOperation(addForm)).then(async res => {console.log('update successful!'); await this.getForms()}).catch(err => console.log(err));
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
                        elements {
                            type
                            start
                            end
                        }
                    }
                }
            }
        }
        `

        let forms = await API.graphql(graphqlOperation(getForms)).then(res => {console.log(res); return res.data.getUser.forms}).catch(error => console.log(error.message));
        console.log(forms);

        this.setState({
            forms
        }, () => {
            console.log('**********************');
            console.log(forms);
            console.log('**********************');
        })
        return forms;
    };

    handleSelectForm = (form) => {
        this.setState({
            selectedForm: form,
            formSelected: true
        })
    }

    displayForm = () => {
        // let {id, contents: {columns, elements, rows}} = this.state.selectedForm;
        // let textboxCount = 0;
        // let checkboxCount = 0;

        // // map through elements (id, type, name, value=this.state.value, onChange={this.handleChange})
        // let displayELements = elements.map(element => {
        //     console.log(element);
        //     if (element.type === 'textbox') {
        //         // need to keep textboxCount
        //         textboxCount++;
        //         return (
        //             <input 
        //                 id={'textbox' + `${textboxCount}`}
        //                 type="text"
        //                 name="textbox"
        //                 value={this.state.value} // might cause issues, since 'this'
        //                 onChange={this.handleChange} // might cause issues, since 'this'
        //             />
        //         )
        //     } else if (element.type === 'checkbox') {
        //         // need to keep checkboxCount
        //         checkboxCount++
        //         return (
        //             <input
        //             type="checkbox"
        //             />
        //         )
        //     }
        // })

        // return (
        //     <>
        //         {displayELements}
        //     </>
        // )
    };

    updateLayouts = (layout) => {
        console.log('updating layouts.......');
        console.log(layout);

        this.setState({
            layouts: {
                lg: layout
            }
        })
    }

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                setCurrentUser: this.setCurrentUser,
                handleChange: this.handleChange,
                toggleForm: this.toggleForm,
                afterSignOut: this.afterSignOut,
                addFormButton: this.addFormButton,
                getForms: this.getForms,
                handleSelectForm: this.handleSelectForm,
                displayForm: this.displayForm,
                updateLayouts: this.updateLayouts
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