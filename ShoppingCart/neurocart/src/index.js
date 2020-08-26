import React from 'react';
import { provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(

  <provider store={store}>
  
    <App />
  
    </provider>,
  document.getElementById('root')
);


//serviceWorker.unregister();
