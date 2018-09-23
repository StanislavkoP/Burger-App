import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../state/actions/index';
import axios from '../../axios-orders';

import Aux from '../../hoc/auxx/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';




class BurgerBuilder extends Component {

	state = {
		purchasing: false,
	}

	componentDidMount () {
		this.props.initIngredients()
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map((el,i) => {
				return ingredients[el]
			})
			.reduce((sum,el)=>{
				return sum + el
			},0)
		return sum > 0
	}


	purchasingHundler = () => {
		if(this.props.isAuth) {
			this.setState({purchasing: true});
		} else {
			this.props.onSetRedirectPath('/checkout')
			this.props.history.push('/auth')
		}

		
	}

	backdropPurchasing = () => {
		this.setState({purchasing: false})

	}

	purchusingContinueHundler = () => {
		this.props.onPurchaseInit();
		this.props.history.push('/checkout')

	}

	render () {
		const disabledInfo = {
			...this.props.ings
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let orderSummery = null;
		let burger = this.props.error ? 'Ingredients can`t be loaded' : <Spinner/>;

		if(this.props.ings) {
			burger = (<Aux>
						<Burger ingredients={this.props.ings}/>

						<BuildControls
							isAuth={this.props.isAuth}
							addIngredient={this.props.onAddIngredient}
							removeIngredient={this.props.onRemoveIngredient}
							disabled={disabledInfo}
							totalPrice={this.props.price}
							purchasable={this.updatePurchaseState(this.props.ings)}
							purchasingHundler={this.purchasingHundler}
						/>
					</Aux>)

			orderSummery = <OrderSummary 
								ingredients={this.props.ings}
								totalPrice={this.props.price}
								cancelPurchusing={this.backdropPurchasing}
								continuePurchusing={this.purchusingContinueHundler}
							/>
		}

		return (
				<Aux>
					<Modal 
						show={this.state.purchasing} 
						purchasingHundler={this.backdropPurchasing}>

						{orderSummery}
					</Modal>

					{burger}
				</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.BurgerBuilder.ingredients,
		price: state.BurgerBuilder.totalPrice,
		error: state.BurgerBuilder.error,
		token: state.auth.token,
		isAuth: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
		onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
		initIngredients: () => dispatch( actions.initIngredients() ),
		onPurchaseInit: () =>  dispatch( actions.purchaseInit() ),
		onSetRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));