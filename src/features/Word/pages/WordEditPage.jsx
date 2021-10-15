import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import { AuthContext } from '../../../context/AuthProvider';
import { useParams, useHistory } from 'react-router-dom';
import { useFirestoreWordEdit } from '../../../hooks/useFirestore';
import { updateWord } from '../../../firebase/services';
import WordEditInput from '../components/WordEditInput';
import Toast from '../components/Toast';
import { wordToArr } from '../../../utils/common';

export default function WordEditPage() {
	const { user } = useContext(AuthContext);
	const history = useHistory();
	const { word: params } = useParams();
	const [word, setWord] = useState({});
	const { definition, example, synonyms, antonyms } = word ?? {};
	const wordMeaning = wordToArr({ definition, example, synonyms, antonyms } || []);
	const [isToastOpen, setIsToastOpen] = useState(false);
	const [isBtnLoading, setIsBtnLoading] = useState(false);
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

	const submitWordEdit = () => {
		setIsBtnLoading(true);
		updateWord(user.uid, word.id.toString(), {
			definition: word.definition,
			example: word.example,
			synonyms: word.synonyms,
			antonyms: word.antonyms,
		});
		setIsToastOpen(true);
		setTimeout(() => {
			setIsBtnLoading(false);
			history.goBack();
		}, 1000);
	};

	return (
		<>
			{!word ? (
				<CircularProgress />
			) : (
				<>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4" component="h4">
								Edit Word
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h5" component="h5">
								{word.word}
							</Typography>
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
						{wordMeaning.map((item) => (
							<WordEditInput
								key={item.title}
								children={item.title}
								value={item.content}
								handleChange={(e) => changeInput(e, item.title)}
							/>
						))}
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
					<Toast open={isToastOpen} setOpen={setIsToastOpen} />
				</>
			)}
		</>
	);
}
