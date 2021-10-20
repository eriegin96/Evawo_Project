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
				? wordMeaning.map((item) => (
						<WordEditInput
							key={item.title}
							children={item.title}
							value={item.content}
							handleChange={(e) => changeInput(e, item.title)}
						/>
				  ))
				: wordMeaning
						.filter((item) => !!item.content)
						.map((item) => (
							<React.Fragment key={item.title}>
								<Grid item xs={3} children={item.title} />
								<Grid item xs={7} children={item.content} />
								<Grid item xs={2} />
							</React.Fragment>
						))}
		</>
	);
}
