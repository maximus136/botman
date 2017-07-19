import React from 'react';

import { Redirect } from 'react-router';

let auth2; // The Sign-In object.
let googleUser; // The current user.

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
export function appStart() {
  gapi.load('auth2', initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
const initSigninV2 = () => {
  auth2 = gapi.auth2.init({
      client_id: '315162330521-asg0gbbgpk48r0r5218lp1hmpknm414a.apps.googleusercontent.com',
      scope: 'profile'
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }

  // Start with the current live values.
  refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
const signinChanged = (val) => {
  console.log('Signin state changed to ', val);
  <Redirect to='/home'/>
 // document.getElementById('signed-in-cell').innerText = val;
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
const userChanged = (user) => {
  console.log('User now: ', user);
  googleUser = user;
  getUserData('id');
  /*document.getElementById('curr-user-cell').innerText =
    JSON.stringify(user, undefined, 2);*/
};

/**
 * Updates the properties in the Google User table using the current user.
 */
export function getUserData(type) {

  if(!googleUser) {
      return false;
  }

  switch (type) {
    case 'id':
    	return googleUser.getId();
    case 'granted-scopes':
    	return googleUser.getGrantedScopes();
    case 'auth-response':
      return googleUser.getAuthResponse();
		default:
			return false;
  }
};

export function logOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    <Redirect to='/'/>
  });
}

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
const refreshValues = () => {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();
    getUserData('id');
  }
}
