import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function Toast({open, setOpen}) {

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
				open={open}
				onClose={handleClose}
				autoHideDuration={3000}
				// key={'bottom' + 'right'}
			>
				<Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
					Saved successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}
