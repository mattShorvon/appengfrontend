
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './root-reducer';

const initialState = {}; 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export const persistor = persistStore(store);

export default { store, persistor };




