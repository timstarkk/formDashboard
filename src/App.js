import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ItemPage from './pages/ItemPage/ItemPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar/Navbar';
import AboutPage from './pages/AboutPage';
import ConfirmPage from './pages/Confirm';

import '../node_modules/react-grid-layout/css/styles.css';

Amplify.configure(config);
function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/dashboard/:slug" component={ItemPage} />
          <Route exact path="/account/signup" component={SignUp} />
          <Route exact path="/account/signin" component={SignIn} />
          <Route exact path="/account/confirm" component={ConfirmPage} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </ScrollToTop>
    </>
  );
}

export default App;
