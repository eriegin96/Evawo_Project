import React, { useContext, useState } from 'react';
import { Grid, Tooltip, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { styled } from '@mui/material/styles';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import './wordPage.scss';
import wordApi from '../../../api/wordApi';
import { wordList } from '../dbWordList';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { addWord } from '../../../firebase/services';

// const Item = styled('div')(({ theme }) => ({
// 	...theme.typography.body1,
// 	padding: theme.spacing(1),
// 	textAlign: 'center',
// 	color: theme.palette.text.primary,
// }));

export default function WordPage() {
	const { user } = useContext(AuthContext);
	const { word, isLoading, totalWords } = useContext(AppContext);
	const [isBtnLoading, setIsBtnLoading] = useState(false);

	function handleAudioClick() {
		document.getElementById('word__audio').play();
	}

	function newWord() {
		setIsBtnLoading(true);
		const randomWord = wordList[Math.floor(Math.random() * 233464)];
		const fetchWord = async () => {
			try {
				const res = await wordApi.getWord(randomWord);
				const newFetchWord = {
					id: totalWords + 1,
					...res,
				};
				addWord(user.uid, (totalWords + 1).toString(), newFetchWord);
				setIsBtnLoading(false);
			} catch (err) {
				console.log(err);
			}
		};

		fetchWord();
	}

	return (
		<>
			{isLoading ? (
				<CircularProgress />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<LoadingButton onClick={newWord} loading={isBtnLoading}>
							New Word
						</LoadingButton>
						{word.word ? <h2>{word.word}</h2> : <></>}
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
					{word.definition ? (
						<>
							<Grid item xs={3} children="Definition" />
							<Grid item xs={7} children={word.definition} />
						</>
					) : (
						<></>
					)}

					{word.example ? (
						<>
							<Grid item xs={3} children="Example" />
							<Grid item xs={7} children={word.example} />
						</>
					) : (
						<></>
					)}
					{word.origin ? (
						<>
							<Grid item xs={3} children="Origin" />
							<Grid item xs={7} children={word.origin} />
						</>
					) : (
						<></>
					)}
					{word.synonyms ? (
						<>
							<Grid item xs={3} children="Synonyms" />
							<Grid item xs={7} children={word.synonyms} />
						</>
					) : (
						<></>
					)}
					{word.antonyms ? (
						<>
							<Grid item xs={3} children="Antonyms" />
							<Grid item xs={7} children={word.antonyms} />
						</>
					) : (
						<></>
					)}
				</Grid>
			)}
		</>
	);
}
