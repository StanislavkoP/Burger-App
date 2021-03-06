import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCanclerHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summery = <Redirect to="/" />

        if(this.props.ings) {
            summery = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients}
                        continueOrderHandler={this.checkoutContinueHandler}
                        canclerOrderHandler={this.checkoutCanclerHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data/'} 
                        component={ContactData}
                    />
                </div>
            )
        }

        return summery;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);