import React, { useContext } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import './word.scss';
import { AppContext } from '../../../context/AppProvider';
import WordGrid from '../components/WordGrid';
import img from '../../../resources/img/doodle.png';

export default function WordPage() {
	const { word } = useContext(AppContext);

	function handleAudioClick() {
		document.getElementById('word__audio').play();
	}

	return (
		<>
			{!word ? (
				<CircularProgress className="word-page--loading" />
			) : (
				<div className="word-page__wrapper">
					<img src={img} alt="" className="word-page__img" />
					<Grid container spacing={2}>
						<WordGrid isEditing={false} word={word} handleAudioClick={handleAudioClick} />
					</Grid>
				</div>
			)}
		</>
	);
}
