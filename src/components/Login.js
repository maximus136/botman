import React from 'react';

const Login = (props) => (
  <div className="md-grid">
    <h6>Sign in using your Google ID</h6>
    <div className="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
);

export default Login;