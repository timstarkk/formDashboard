import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ItemProvider } from './context';
import Toolbox from './components/Toolbox/Toolbox';
import ShowForm from './pages/ShowForm';
import { render } from '@testing-library/react';

export default function Index() {
    
    let path = window.location.pathname
    let isShowform = path.toLowerCase().includes("showform")
    
    return (
        isShowform ? (
            <ItemProvider>
                <Router>
                    <Switch>
                        <Route exact path="/showform/:slug" component={ShowForm} />
                    </Switch>
                </Router>
            </ItemProvider>
        ) : (
            <ItemProvider>
                <Router>
                    <Toolbox />
                    <div id="app-container">
                        <App />
                    </div>
                </Router>
            </ItemProvider>
        )
    )
}

ReactDOM.render(
    <Index />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
