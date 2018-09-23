import React, {Component} from 'react';
import classes from './Auth.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../state/actions/index';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';



class Auth extends Component {
	state = {
        controls: {
			email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
					required: true,
					isEmail: true
                },
                valid: false,
                touched: false
			},
			
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
					required: true,
					minLength: 6
                },
                valid: false,
                touched: false
            }



        },
        formIsValid: false,
        isSingUp: false
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    switchSign = () => {
        this.setState(prevState => {
            return {
                isSingUp: !this.state.isSingUp
            }
        })
    }

	checkValidity = (value, rules) => {
        let isValid = true;


        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

	changeInputHandler = (event, inputIdentifier) => {
        const updatedFormElement = { 
			...this.state.controls,
			[inputIdentifier] : {
				...this.state.controls[inputIdentifier],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
				touched: true
			}
		};
		this.setState({controls: updatedFormElement})
	}
	
	submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp)
    }

	render () {
		let elementsInputArray = [];

        for(let key in this.state.controls) {
            elementsInputArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = (
                    elementsInputArray.map(el => (
                        <Input 
                            key={el.id}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            shouldValidate={el.config.validation.required}
                            invalid={!el.config.valid}
                            value={el.config.value}
                            touched={el.config.touched}
                            changed={(event) => this.changeInputHandler(event, el.id)}
                        />
                     )) 
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if ( this.props.isAuth ) {
            authRedirect = <Redirect to="/"/>
        }

		return (
			<div className={classes.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchSign}
                    btnType="Danger">
                        { this.state.isSingUp ? "SignIn" : 'SignUp'}
                </Button>  
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.BurgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath

    }
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSign) => dispatch(actions.auth(email, password, isSign)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);