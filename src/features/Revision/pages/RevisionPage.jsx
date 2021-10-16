import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Button,
	Typography,
	Grid,
	IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaunchIcon from '@mui/icons-material/Launch';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';

export default function RevisionPage() {
	const history = useHistory();
	const { user } = useContext(AuthContext);
	const { revisionList } = useContext(AppContext);

	console.log(revisionList);

	return (
		<div>
			<Grid container spacing={2}>
				{revisionList.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<Card sx={{ minWidth: 275 }} variant="outlined">
							<CardContent>
								<Typography variant="h5" component="div">
									{item.word}
								</Typography>
								<Typography sx={{ mb: 1.5 }} color="text.secondary">
									{item.type}
								</Typography>
								<Typography variant="body2">{item.definition}</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'space-between' }}>
								<IconButton
									aria-label="settings"
									size="small"
									onClick={() => history.push(`/history/${item.word}`)}
								>
									<LaunchIcon />
								</IconButton>
								<IconButton aria-label="settings">
									<MoreVertIcon />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
