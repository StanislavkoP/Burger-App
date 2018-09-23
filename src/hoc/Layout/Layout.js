import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Aux from '../auxx/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SlideDrawer/SlideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerShowHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	render () {
		return (
			<Aux>
				<Toolbar 
					isAuth={this.props.isAuth}
					showSideDrower={this.sideDrawerShowHandler}/>
				<SideDrawer
					isAuth={this.props.isAuth}
					open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout)
