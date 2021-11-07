import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { AuthContext } from '../../../context/AuthProvider';
import { useParams, useHistory } from 'react-router-dom';
import { useFirestoreWordEdit } from '../../../hooks/useFirestore';
import { updateWord } from '../../../firebase/services';
import Toast from '../components/Toast';
import WordGrid from '../components/WordGrid';
import WordButtons from '../components/WordButtons';

export default function HistoryWordPage() {
	const { user } = useContext(AuthContext);
	const history = useHistory();
	const { word: params } = useParams();
	const [word, setWord] = useState({});
	const [isToastOpen, setIsToastOpen] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const wordEdit = useFirestoreWordEdit(user?.uid, params);


	useEffect(() => {
		setWord(wordEdit);
	}, [wordEdit]);

	useEffect(() => {
		if (word === undefined) history.push('/not-found');
	}, [word, history]);

	const handleAudioClick = () => {
		document.getElementById('word__audio').play();
	};

	const changeInput = (e, item) => {
		const key = item.charAt(0).toLowerCase() + item.slice(1);
		const newObj = { ...word };
		newObj[key] = e.target.value;
		setWord(newObj);
	};

	const handleSetRevision = () => {
		console.log(word.createdAt.toDate().getDay())
	}

	const submitWordEdit = () => {
		setIsBtnLoading(true);
		updateWord(user.uid, word.id.toString(), {
			definition: word.definition,
			origin: word.origin,
			example: word.example,
			synonyms: word.synonyms,
			antonyms: word.antonyms,
		});
		setIsToastOpen(true);
		setTimeout(() => {
			setIsBtnLoading(false);
			setIsEditing(false);
		}, 300);
	};

	return (
		<>
			{!word ? (
				<CircularProgress className="word-page--loading" />
			) : (
				<div className="word-page__wrapper">
					<Grid container spacing={2}>
						{isEditing ? (
							<Grid item xs={12}>
								<Typography variant="h4" component="h4">
									Edit Word
								</Typography>
							</Grid>
						) : (
							<></>
						)}
						<WordGrid
							isEditing={isEditing}
							word={word}
							handleAudioClick={handleAudioClick}
							changeInput={changeInput}
						/>
						<WordButtons
							isEditing={isEditing}
							isBtnLoading={isBtnLoading}
							submitWordEdit={submitWordEdit}
							setIsEditing={setIsEditing}
							handleSetRevision={handleSetRevision}
						/>
					</Grid>
					<Toast open={isToastOpen} setOpen={setIsToastOpen} />
				</div>
			)}
		</>
	);
}
