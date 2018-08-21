import React, {Component} from 'react';
import classes from './Layout.css';
import Aux from '../auxx/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SlideDrawer/SlideDrawer';

export default class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerShowHandler = () => {
		console.log('object')
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	render () {
		return (
			<Aux>
				<Toolbar showSideDrower={this.sideDrawerShowHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}
