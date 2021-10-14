import React from 'react';
import { Grid, TextField } from '@mui/material';

export default function WordEditInput(props) {
	const { children, value, handleChange } = props;

	return (
		<>
			<Grid item xs={3} children={children} />
			<Grid
				item
				xs={7}
				children={
					<TextField
						id="outlined-textarea"
						value={value}
						onChange={(e) => handleChange(e)}
						multiline
						fullWidth
					/>
				}
			/>
		</>
	);
}
