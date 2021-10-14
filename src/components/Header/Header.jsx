import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import {
	AppBar,
	Button,
	Box,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Tooltip,
	Divider,
} from '@mui/material';
import './header.scss';

import LogOutDialog from '../LogOutDialog';
import { AuthContext } from '../../context/AuthProvider';

function User() {
	const { user } = useContext(AuthContext);

	// Open/Close userMenu
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Open/Close Logout Dialog
	const [IsDialogOpen, setIsDiaLogOpen] = useState(false);
	const handleDialogOpen = () => {
		setIsDiaLogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDiaLogOpen(false);
	};

	return (
		<React.Fragment>
			<IconButton
				size="large"
				edge="end"
				aria-label="account of current user"
				aria-controls="primary-search-account-menu"
				aria-haspopup="true"
				onClick={handleMenuOpen}
				color="inherit"
			>
				<Tooltip title={user?.displayName}>
					<Avatar src={user?.photoURL} alt="Eire Gin" />
				</Tooltip>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id="primary-search-account-menu"
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={isMenuOpen}
				onClick={handleMenuClose}
				onClose={handleMenuClose}
			>
				<MenuItem >
					<Link to="/user" className="header__user">
						My Account
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleDialogOpen}>Log Out</MenuItem>
				<LogOutDialog open={IsDialogOpen} handleClose={handleDialogClose} />
			</Menu>
		</React.Fragment>
	);
}

function LoggedIn() {
	return (
		<React.Fragment>
			<Tooltip title="Go to History">
				<NavLink to="/history" className="nav__link">
					History
				</NavLink>
			</Tooltip>
			<Tooltip title="Go to Trash">
				<NavLink to="/trash" className="nav__link">
					Trash
				</NavLink>
			</Tooltip>
			<User />
		</React.Fragment>
	);
}

function NotLoggedIn() {
	return (
		<Button size="large">
			<NavLink to="/login" className="nav__link">
				Log In
			</NavLink>
		</Button>
	);
}

export default function Header() {
	const { user } = useContext(AuthContext);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link className="logo" to="/">
						<h2>EVAWO</h2>
					</Link>
					<Box sx={{ flexGrow: 1 }} />
					{user?.uid ? <LoggedIn /> : <NotLoggedIn />}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
