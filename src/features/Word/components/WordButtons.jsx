import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function WordButtons(props) {
	const { isEditing, setIsEditing, submitWordEdit, isBtnLoading, handleSetRevision } = props;
	const history = useHistory();

	return (
		<>
			{isEditing ? (
				<Grid item xs={12}>
					<LoadingButton
						onClick={submitWordEdit}
						loading={isBtnLoading}
						variant="contained"
						className="word-page__btn"
					>
						Update
					</LoadingButton>
					<Button
						variant="contained"
						color="error"
						onClick={() => setIsEditing(false)}
						className="word-page__btn"
					>
						Cancel
					</Button>
				</Grid>
			) : (
				<Grid item xs={12}>
					<LoadingButton
						onClick={() => setIsEditing(true)}
						loading={isBtnLoading}
						variant="contained"
						className="word-page__btn"
					>
						Edit
					</LoadingButton>
					{/* <LoadingButton
						onClick={handleSetRevision}
						loading={isBtnLoading}
						variant="contained"
						color="warning"
						className="word-page__btn"
					>
						Set Revision
					</LoadingButton> */}
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							history.goBack();
						}}
						className="word-page__btn"
					>
						Go back
					</Button>
				</Grid>
			)}
		</>
	);
}
