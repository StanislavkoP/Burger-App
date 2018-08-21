import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildConstrol';


const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Meat', type: 'cheese'},
	{label: 'Cheese', type: 'meat'}
];

const buildControl = (props) => (
	<div className={classes.BuildControls}>
	<p>Total price: {props.totalPrice.toFixed(2)}</p>
	<button onClick={props.purchasingHundler} className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW</button>
		{
			controls.map(ctrl => (
				<BuildControl 
					key={ctrl.label} 
					label={ctrl.label}
					addedIngredient={() => props.addIngredient(ctrl.type)}
					removedIngredient={() => props.removeIngredient(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
					purchasable={props.purchasable}
				/>
			))
		}
	</div>
);

export default buildControl;