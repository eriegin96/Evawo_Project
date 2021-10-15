import React, { useCallback, useContext } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { AuthContext } from '../../../context/AuthProvider';

export default function RemoveWordDialog(props) {
	const { action, title, content, open, handleClose, selectionModel } = props;
	const { user } = useContext(AuthContext);

	const deleteWord = useCallback(
		() => () => {
      action(user.uid, selectionModel)
			handleClose();
		},
		[action, user, selectionModel, handleClose]
	);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={deleteWord()}>Yes</Button>
				<Button color="error" onClick={handleClose} autoFocus>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
