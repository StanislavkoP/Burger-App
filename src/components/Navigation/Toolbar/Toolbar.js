import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList'
import SideDrowerToggle from '../../UI/sideDrawerToggle/SideDrawerToggle'


const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<SideDrowerToggle clicked={props.showSideDrower} />
		<Logo/>
		<nav  className={classes.DesktopOnly}>
			<NavigationList  isAuth={props.isAuth}/>
		</nav>
	</header>
)

export default toolbar;