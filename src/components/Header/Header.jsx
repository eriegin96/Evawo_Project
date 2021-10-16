import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppBar, Button, Box, Toolbar, Tooltip } from '@mui/material';
import './header.scss';
import UserAvatar from './UserAvatar';
import { AuthContext } from '../../context/AuthProvider';
import UserNotification from './UserNotification';

function LoggedIn() {
	return (
		<>
			<Box>
				<Tooltip title="Go to History">
					<NavLink to="/history" className="nav__link">
						History
					</NavLink>
				</Tooltip>
				<Tooltip title="Go to Revision">
					<NavLink to="/revision" className="nav__link">
						Revision
					</NavLink>
				</Tooltip>
				<Tooltip title="Go to Trash">
					<NavLink to="/trash" className="nav__link">
						Trash
					</NavLink>
				</Tooltip>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Box>
				<UserNotification />
				<UserAvatar />
			</Box>
		</>
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
