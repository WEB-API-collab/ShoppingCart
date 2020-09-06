import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';

var firebase = require("firebase/app");

var firebaseConfig = {
  apiKey: "AIzaSyB4HMcAfTPZ88WSOL7mRxoz8uL9WoZBaWI",
  authDomain: "neurocart1.firebaseapp.com",
  databaseURL: "https://neurocart1.firebaseio.com",
  projectId: "neurocart1",
  storageBucket: "neurocart1.appspot.com",
  messagingSenderId: "533833875150",
  appId: "1:533833875150:web:e13ff14a0fb485a14f1a9f",
  measurementId: "G-5DEGR2X931"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));