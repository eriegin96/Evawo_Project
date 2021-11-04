import React from 'react';
import { Grid, Tooltip, Typography } from '@mui/material';
import SurroundSoundIcon from '@mui/icons-material/SurroundSound';
import { wordToArr } from '../../../utils/common';
import WordEditInput from './WordEditInput';

export default function WordGrid(props) {
	const { isEditing, word, handleAudioClick, changeInput } = props;
	const { definition, example, origin, synonyms, antonyms } = word ?? {};
	const wordMeaning = wordToArr({ definition, example, origin, synonyms, antonyms } || []);

	return (
		<>
			<Grid item xs={12}>
				<Typography variant="h4" component="h4" sx={{ fontWeight: 500 }}>
					{word.word}
				</Typography>
				{word.phonetic && (
					<div className="word-page__phonetic">
						{word.phonetic} &nbsp;
						<audio id="word__audio" src={word.audio}></audio>
						<Tooltip title="Click to hear">
							<SurroundSoundIcon
								onClick={handleAudioClick}
								className="word-page__sound"
							/>
						</Tooltip>
					</div>
				)}
				{word.type && <div>{word.type}</div>}
			</Grid>
			{isEditing
				? wordMeaning.map((item, i) => (
						<WordEditInput
							key={i}
							children={item.title}
							value={item.content}
							handleChange={(e) => changeInput(e, item.title)}
						/>
				  ))
				: wordMeaning
						.filter((item) => !!item.content)
						.map((item, i) => (
							<div className="word-page__text-container" key={i}>
								<div className="word-page__text">
									<div>
										<strong>{item.title}</strong>
									</div>
									<div>{item.content}</div>
								</div>
							</div>
						))}
		</>
	);
}
