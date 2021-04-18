import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'src/utils/firebaseConfig';
import './Login.scss';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => (
  <div>
    <h1>Connexion</h1>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  </div>
);

export default Login;
