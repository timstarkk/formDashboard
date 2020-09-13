import React, { Component } from 'react';
import query from './data';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import config from './aws-exports';
import { getDefaultNormalizer } from '@testing-library/react';

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
        cartVisible: false,
        cartItemsData: [],
        cartId: '',
        isLoggedIn: false,
        forms: []
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

    toggleCart = () => {
        this.getCartItems();
        this.setState({
            cartVisible: !this.state.cartVisible
        });
    };

    addFormButton = () => {
        let that = this;

        const userId = this.state.currentUser.sub
        console.log(userId);

        const addForm = `
            mutation {
                updateUser(input: {
                    id: "${userId}",
                    forms: {
                        contentsArray: ["default"]
                    }
                }) {
                    id forms { contentsArray }
                }
            }
        `
        
        API.graphql(graphqlOperation(addForm)).then(res => console.log('update successful!')).catch(err => console.log(err));
    };

    async addFormFunction(that) {
        console.log(that);
        try {
            console.log('whats up bros')
            const userId = that.state.currentUser.sub
            console.log(userId);

            const addForm = `
                mutation {
                    updateUser(input: {
                        id: "${userId}",
                        forms: {
                            contentsArray: ["default"]
                        }
                    }) {
                        id forms { contentsArray }
                    }
                }
            `
            let forms = await API.graphql(graphqlOperation(addForm)).then(res => res.data.getUser.forms).catch(err => console.log(err.message));
                    
            console.log(forms);
        } catch (error) {
            console.log('error bro: ');
            console.log(error);
        }
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
                    contentsArray
                }
            }
        }
        `

        let forms = await API.graphql(graphqlOperation(getForms)).then(res => res.data.getUser.forms).catch(error => console.log(error.message));
        return forms;
    };

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                setCurrentUser: this.setCurrentUser,
                handleChange: this.handleChange,
                toggleCart: this.toggleCart,
                afterSignOut: this.afterSignOut,
                addFormButton: this.addFormButton,
                getForms: this.getForms
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