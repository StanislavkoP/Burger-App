import React from 'react';
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxx/Aux';

const sideDrawer = ( props ) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if(props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}

	return (
		<Aux>
			<Backdrop show={props.open} modalHundler={props.closed}/>
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div height="50px">
					<Logo/>
				</div>

				<nav>
					<NavigationList/>
				</nav>
			</div>
		</Aux>
	);
}

export default sideDrawer;