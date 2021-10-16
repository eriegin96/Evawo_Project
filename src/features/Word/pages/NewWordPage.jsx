import React, { useContext, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { styled } from '@mui/material/styles';
import './word.scss';
import wordApi from '../../../api/wordApi';
import { wordList } from '../dbWordList';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { addWord } from '../../../firebase/services';
import WordGrid from '../components/WordGrid';

// const Item = styled('div')(({ theme }) => ({
// 	...theme.typography.body1,
// 	padding: theme.spacing(1),
// 	textAlign: 'center',
// 	color: theme.palette.text.primary,
// }));

export default function WordPage() {
	const { user } = useContext(AuthContext);
	const { word, totalWords } = useContext(AppContext);
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
			{!word ? (
				<CircularProgress className="word-page--loading" />
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<LoadingButton
							onClick={newWord}
							loading={isBtnLoading}
							sx={{ left: 'unset' }}
						>
							New Word
						</LoadingButton>
					</Grid>
					<WordGrid isEditing={false} word={word} handleAudioClick={handleAudioClick} />
				</Grid>
			)}
		</>
	);
}
