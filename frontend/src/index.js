import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';

var firebase = require("firebase/app");

var firebaseConfig = {
  apiKey: "AIzaSyBoDq8ULNFhCFKh3xq-5dnUxG_gwVO2D0M",
  authDomain: "test-pptt.firebaseapp.com",
  databaseURL: "https://test-pptt.firebaseio.com",
  projectId: "test-pptt",
  storageBucket: "test-pptt.appspot.com",
  messagingSenderId: "803780212034",
  appId: "1:803780212034:web:b73b2139a876eb028484db",
  measurementId: "G-E9EPEL2GKJ"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));