import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';

const intialState = {};
const reducer = combineReducers({
    productLists: productListReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, intialState, composeEnchancer(applyMiddleware(thunk)));
export default store;