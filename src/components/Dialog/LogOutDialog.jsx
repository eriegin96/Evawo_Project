import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/config';

export default function LogOutDialog(props) {
	const { open, handleClose } = props;
	const history = useHistory();

	const handleLogOut = () => {
		auth.signOut();
		history.push('/');
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{'Log Out'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Do you want to log out?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLogOut}>Yes</Button>
				<Button color="error" onClick={handleClose} autoFocus>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
