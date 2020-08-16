import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ItemProvider } from './context';
import ShoppingCart from './components/ShoppingCart/Toolbox';

ReactDOM.render(
    <ItemProvider>
        <Router>
            <ShoppingCart />
            <div id="app-container">
                <App />
            </div>
        </Router>
    </ItemProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
