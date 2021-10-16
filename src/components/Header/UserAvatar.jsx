import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Avatar, Tooltip, Divider } from '@mui/material';
import LogOutDialog from '../Dialog/LogOutDialog';
import { AuthContext } from '../../context/AuthProvider';

export default function UserAvatar() {
	const { user } = useContext(AuthContext);

	// Open/Close userMenu
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const id = isMenuOpen ? 'user-avatar' : undefined;
	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	// Open/Close Logout Dialog
	const [isDialogOpen, setIsDiaLogOpen] = useState(false);
	const handleDialogOpen = () => {
		setIsDiaLogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDiaLogOpen(false);
	};

	return (
		<>
			<IconButton
				size="large"
				edge="end"
				aria-label="account of current user"
				aria-controls={id}
				aria-haspopup="true"
				onClick={handleMenuOpen}
				color="inherit"
			>
				<Tooltip title={user?.displayName}>
					<Avatar src={user?.photoURL} alt={user?.displayName} />
				</Tooltip>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id={id}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={isMenuOpen}
				onClick={handleMenuClose}
				onClose={handleMenuClose}
			>
				<MenuItem>
					<Link to="/user" className="header__user">
						My Account
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleDialogOpen}>Log Out</MenuItem>
				<LogOutDialog open={isDialogOpen} handleClose={handleDialogClose} />
			</Menu>
		</>
	);
}
