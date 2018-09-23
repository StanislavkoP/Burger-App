import { createStore } from 'redux';


const initialState = {
	counter : 0
}

const rootReducer = (state, action) => {
	return state;
}

const store = createStore(rootReducer);

console.log(store.getState());