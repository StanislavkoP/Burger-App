import React from 'react';
import Aux from '../../../hoc/auxx/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients)
		.map(ingKey=>{
			return (
				<li key={ingKey}>
					<span style={{textTransform:'capitalize'}}>{ingKey} </span>: {props.ingredients[ingKey]}
				</li>
			)
		});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Total price: {props.totalPrice}</p>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientsSummary}
			</ul>
			<p>Continue to Checkout?</p>
			<Button btnType={'Danger'} clicked={props.cancelPurchusing }>CANCEL</Button>
			<Button btnType={'Success'} clicked={props.continuePurchusing }>CONTINUE</Button>
		</Aux>
	);
};

export default orderSummary;