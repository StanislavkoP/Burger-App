import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
	let transformedIndredients = Object.keys(props.ingredients)
		.map(ingKey => {
			return [...Array( props.ingredients[ingKey] ) ].map((_,idx) => {
				return 	<BurgerIngredient  key={ingKey + idx} type={ingKey}/>
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIndredients.length <= 0) {
		transformedIndredients = <p>No ingredients</p>
	} 

	return (
		<div className={classes.Burger}>
			<BurgerIngredient  type="bread-top"/>
			{transformedIndredients}
			<BurgerIngredient  type="bread-bottom"/>

		</div>
	)
}

export default burger;