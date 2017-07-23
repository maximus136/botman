import React, { Component, PropTypes } from 'react';
import {appStart, getUserData} from 'helpers/auth';


class Login extends Component {
  constructor() {
    super();
  }

  /*componentDidMount() {
    console.log(getUserData('id'));
   if (getUserData('id')) {
     this.context.router.push('/home');
   }
  }*/

  render() {
    return (
      <div className="md-grid google-sign-in">
      <h6>Sign in using your Google ID</h6>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login;