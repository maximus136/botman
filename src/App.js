import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import Login from './components/Login';
import ChatBox from './components/ChatBox';
import {appStart, getUserData, logOut} from 'helpers/auth';

/*const RouteHideDrawer = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => {
    if (document.querySelector('.mdl-layout__drawer')) {
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
      document.querySelector('.mdl-layout__drawer').classList.remove('is-visible');
    }
    return <Component/>
  }}/>
)*/


/*const requireAuth = (nextState, replace) => {
  console.log('hi');
  if (!getUserData('id')) {
    replace({
      pathname: '/'
    })
  }
  if (getUserData('id')) {
    replace({
      pathname: '/about'
    })
  }
}*/

const signOut = () => {
  if (getUserData('id')) {
    logOut();
  } else {
    return false;
  }
}

const checkAuth = (Component) => (
  !getUserData('id') ? (
    <Redirect to='/'/>
  ) : (
    <Component />
  )
);


export default () => (
  <Router>
    <Layout fixedHeader>
      <Header title="Botman"/>
      <Drawer title="Botman">
        <Navigation>
          <Link to="/chatbox">Botman</Link>
          <Link to="/">Login</Link>
          <Link to="/" onClick={signOut}>Logout</Link>
        </Navigation>
      </Drawer>
      <Content className="start-page">
        <h3>Welcome to <Link to="/chatbox">Botman</Link>
        </h3>
        <Route path="/" render={() => (
          getUserData('id') ? (
            <Redirect to='/chatbox'/>
          ) : (
            <Login />
          )
        )} />
        <Route path="/chatbox" render={() => checkAuth(ChatBox)} />
      </Content>
    </Layout>
  </Router>
);
