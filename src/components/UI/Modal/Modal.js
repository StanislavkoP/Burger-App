import React, {Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/auxx/Aux'

export default class Modal extends Component {

	shouldComponentUpdate (nextProps, nextState) {
		return nextProps.show !== this.props.show
	}

	render () {
		return (
			<Aux>
				<Backdrop show={this.props.show} modalHundler={this.props.purchasingHundler}/>
				<div 
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}