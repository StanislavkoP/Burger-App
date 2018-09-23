import axios from '../../axios-orders';
import * as actionsType from './actionsType';

export const addIngredient = ingName => {
	return {
		type:actionsType.ADD_INGREDIENT, 
		ingredientName: ingName
	}
}

export const removeIngredient = ingName => {
	return {
		type:actionsType.REMOVE_INGREDIENT, 
		ingredientName: ingName
	}
}

export const setIngredients = ingredients => {
	return {
		type: actionsType.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionsType.FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {

	return dispatch => {
		axios.get('https://react-burger-app-4335c.firebaseio.com/ingredients.json')
			.then(res => {
				dispatch( setIngredients(res.data) )
			})
			.catch( dispatch( fetchIngredientsFailed() ) )
	}
}