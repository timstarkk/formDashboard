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
        shopItems: [],
        sortedItems: [],
        featuredItems: [],
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
        cartId: ''
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
            currentUser: userInfo
        }, () => {
            if (this.state.currentUser.username) {
                this.checkLocalCart();
            }
        });

    };

    afterSignOut = () => {
        this.setState({
            cartItemsData: []
        })
    };

    toggleCart = () => {
        this.getCartItems();
        this.setState({
            cartVisible: !this.state.cartVisible
        });
    };

    handlePlusMinus = (itemId, amount, operator, index) => { 
        if (operator === "plus") {
            amount++;
        } else {
            amount--;
        }

        if (Object.keys(this.state.currentUser).length === 0) {
            console.log('user not logged in');
            if (amount === 0) {
                const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
                delete shoppingCart.items[`${itemId}`];
                console.log(shoppingCart)
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

                let cartItemsData = this.state.cartItemsData;
                cartItemsData.splice(index, 1);
                this.setState({
                    cartItemsData
                })
            } else {
                const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
                shoppingCart.items[`${itemId}`] = amount;
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

                let cartItemsData = this.state.cartItemsData;

                for (const [index, item] of cartItemsData.entries()) {
                    if (item.itemId === itemId) {
                        cartItemsData[index].amount = amount;
                    }
                }

                console.log(cartItemsData);
                this.setState({})
            }
        } else {
            const cartId = this.state.cartId;
            const userSub = this.state.currentUser.sub

            const getCurrentCart = `
                query {
                    listShoppingCarts(filter: {
                        userSub: {
                            contains: "${userSub}"
                        }
                    }) {
                        items {
                            id
                            items {
                                itemId
                                amount
                            }
                        }
                    }
                }
            `

            if (amount === 0) {
                // remove item from cart
                API.graphql(graphqlOperation(getCurrentCart)).then(res => {
                    let cartItems = res.data.listShoppingCarts.items[0].items;
                    cartItems.splice(index, 1);
                    let stringifiedItems = JSON.stringify(cartItems);
                    let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');

                    const updateCart = `
                        mutation {
                            updateShoppingCart(input: {
                            id: "${cartId}"
                            items: ${unquotedItems}
                            }) {items {itemId amount}}
                        }
                    `

                    API.graphql(graphqlOperation(updateCart)).then(res => {
                        let cartItemsData = this.state.cartItemsData;
                        cartItemsData.splice(index, 1);
                        this.setState({
                            cartItemsData
                        });
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            } else {

                API.graphql(graphqlOperation(getCurrentCart)).then(res => {
                    let cartItems = res.data.listShoppingCarts.items[0].items;
                    for (const [index, item] of cartItems.entries()) {
                        if (item.itemId === itemId) {
                            cartItems[index].amount = amount;
                        }
                    }

                    let stringifiedItems = JSON.stringify(cartItems);
                    let unquotedItems = stringifiedItems.replace(/"([^"]+)":/g, '$1:');

                    const updateCart = `
                        mutation {
                            updateShoppingCart(input: {
                            id: "${cartId}"
                            items: ${unquotedItems}
                            }) {items {itemId amount}}
                        }
                    `

                    API.graphql(graphqlOperation(updateCart)).then(res => {
                        let cartItemsData = this.state.cartItemsData;
                        cartItemsData[index].amount = amount;
                        this.setState({
                            cartItemsData
                        });
                    }).catch(err => console.log(err));
                })
            }
        }
    };

    checkLocalCart = () => {
        console.log('checking local cart');
        console.log(this.state.cartItemsData)
        const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        console.log(shoppingCart.items);
        const newItems = [];
        for (const key in shoppingCart.items) {

            const item = {
                itemId: key,
                amount: shoppingCart.items[key]
            }
            newItems.push(item);
        }

        this.addFromLocalStorage(newItems);
        
    };

    render() {
        return (
            <ItemContext.Provider value={{
                ...this.state,
                getItem: this.getItem,
                setCurrentUser: this.setCurrentUser,
                handleChange: this.handleChange,
                addAmountButton: this.addAmountButton,
                handleAddToCart: this.handleAddToCart,
                resetAddAmount: this.resetAddAmount,
                toggleCart: this.toggleCart,
                getCartItems: this.getCartItems,
                getCartItemsData: this.getCartItemsData,
                afterSignOut: this.afterSignOut,
                handlePlusMinus: this.handlePlusMinus
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