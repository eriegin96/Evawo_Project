import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { useParams, useHistory } from 'react-router-dom';
import { useFirestoreWordEdit } from '../../../hooks/useFirestore';
import { updateWord } from '../../../firebase/services';
import WordEditInput from '../components/WordEditInput';

export default function WordEditPage() {
	const { user } = useContext(AuthContext);
	const { isLoading, setIsLoading } = useContext(AppContext);
	const history = useHistory();
	const { word: params } = useParams();
	const [word, setWord] = useState({});
	const [isBtnLoading, setIsBtnLoading] = useState(false);
	const wordEdit = useFirestoreWordEdit(user?.uid, params);

	useEffect(() => {
		setWord(wordEdit);
		setIsLoading(false);
	}, [wordEdit, setIsLoading]);

	function handleAudioClick() {
		document.getElementById('word__audio').play();
	}

	const submitWordEdit = () => {
		setIsBtnLoading(true);
		updateWord(user.uid, word.id.toString(), {
			definition: word.definition,
			example: word.example,
			synonyms: word.synonyms,
			antonyms: word.antonyms,
		});
		history.goBack();
	};

	return (
		<>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<h2>Edit Word</h2>
					</Grid>
					<Grid item xs={12}>
						<h3>{word.word}</h3>
						{word.phonetic ? (
							<div className="wordpage__phonetic">
								{word.phonetic} &nbsp;
								<audio id="word__audio" src={word.audio}></audio>
								<Tooltip title="Click to hear">
									<SurroundSoundIcon
										onClick={handleAudioClick}
										className="word-page__sound"
									/>
								</Tooltip>
							</div>
						) : (
							<></>
						)}
						{word.type ? <div>{word.type}</div> : <></>}
					</Grid>
					{word.origin ? (
						<>
							<Grid item xs={3} children="Origin" />
							<Grid item xs={7} children={word.origin} />
						</>
					) : (
						<></>
					)}
					<WordEditInput
						children="Definition"
						value={word.definition}
						handleChange={(e) => setWord({ ...word, definition: e.target.value })}
					/>
					<WordEditInput
						children="Example"
						value={word.example}
						handleChange={(e) => setWord({ ...word, example: e.target.value })}
					/>
					<WordEditInput
						children="Synonyms"
						value={word.synonyms}
						handleChange={(e) => setWord({ ...word, synonyms: e.target.value })}
					/>
					<WordEditInput
						children="Antonyms"
						value={word.antonyms}
						handleChange={(e) => setWord({ ...word, antonyms: e.target.value })}
					/>
					<Grid item xs={3} />
					<Grid item xs={3}>
						<LoadingButton
							onClick={submitWordEdit}
							loading={isBtnLoading}
							variant="contained"
						>
							Update
						</LoadingButton>
					</Grid>
					<Grid item xs={2}>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								history.goBack();
							}}
						>
							Cancel
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
}
