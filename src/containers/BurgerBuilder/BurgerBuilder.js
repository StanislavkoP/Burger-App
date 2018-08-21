import React, {Component} from 'react';
import Aux from '../../hoc/auxx/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	salad: 0.5,
	salad: 1,
	bacon: 1.2,
	meat: 0.8,
	cheese: 2,
}

export default class BurgerBuilder extends Component {

	state = {
		ingredients : {
			salad: 0,
			bacon: 0,
			meat: 0,
			cheese: 0,
		},
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map((el,i) => {
				return ingredients[el]
			})
			.reduce((sum,el)=>{
				return sum + el
			},0)
		this.setState({purchasable: sum > 0})
	}

	addHundlerInredient = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	removeHundlerInredient = (type) => {
		const oldCount = this.state.ingredients[type];

		if(oldCount <= 0) {
			return
		}

		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;

		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	purchasingHundler = () => {
		this.setState({purchasing: true});
	}

	backdropPurchasing = () => {
		this.setState({purchasing: false})
	}

	purchusingContinueHundler = () => {
		alert('You made order')
	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}


		return (
				<Aux>
					<Modal 
						show={this.state.purchasing} 
						purchasingHundler={this.backdropPurchasing}>

						<OrderSummary 
							ingredients={this.state.ingredients}
							totalPrice={this.state.totalPrice}
							cancelPurchusing={this.backdropPurchasing}
							continuePurchusing={this.purchusingContinueHundler}
						/>
					</Modal>

					<Burger ingredients={this.state.ingredients}/>

					<BuildControls
						addIngredient={this.addHundlerInredient}
						removeIngredient={this.removeHundlerInredient}
						disabled={disabledInfo}
						totalPrice={this.state.totalPrice}
						purchasable={this.state.purchasable}
						purchasingHundler={this.purchasingHundler}
					/>
				</Aux>
		);
	}
}