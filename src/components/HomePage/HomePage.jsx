import React from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import './homePage.scss';
import { Link } from 'react-router-dom';

const Item = styled('div')(({ theme }) => ({
	...theme.typography.body1,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.primary,
}));

export default function HomePage() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Item>Welcome to Evawo</Item>
			</Grid>
			<Grid item xs={12}>
				<Item>Discover whole new random words everyday just by a click</Item>
				<Item>
					<Link to="/login">
						<Button variant="contained" sx={{ margin: '0 1rem' }}>
							Login Now
						</Button>
					</Link>
					to get your own pack of vocabularies
				</Item>
			</Grid>
			<Grid item xs={12} className="footer">
				<Item>Copyright by @eriegin96</Item>
			</Grid>
		</Grid>
	);
}
