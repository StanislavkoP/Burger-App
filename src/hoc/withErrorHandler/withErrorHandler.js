import React, {Component} from 'react';
import Aux from '../auxx/Aux'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}

		componentWillMount () {

			this.interceptorsReq = axios.interceptors.request.use(req => {
				this.setState({error: null})
				return req;
			});

			this.interceptorsRes = axios.interceptors.response.use(response => response, err => {
				this.setState({error: err});
			});
		}

		componentWillUnmount () {
			axios.interceptors.request.eject(this.interceptorsReq)
			axios.interceptors.response.eject(this.interceptorsRes)
		}

		errorConfirmHandler = () => {
			this.setState({error: null})
		}

		render () {
			return (
				<Aux>
					<Modal show={this.state.error} purchasingHundler={this.errorConfirmHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props}/>
				</Aux>
			)

		}
	}
}

export default withErrorHandler;