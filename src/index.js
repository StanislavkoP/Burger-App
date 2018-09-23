import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './state/reducers/burgerBuilder';
import orderReducer from './state/reducers/order'
import Authreducer from './state/reducers/auth';



const rootReducer = combineReducers({
	order: orderReducer,
	BurgerBuilder: burgerBuilderReducer,
	auth: Authreducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ) );



ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>	
	,
 document.getElementById('root'));
registerServiceWorker();
