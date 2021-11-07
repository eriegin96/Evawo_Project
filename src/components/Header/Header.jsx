import React, { useContext, useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { AppBar, Button, Box, Toolbar, Tooltip } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import './header.scss';
import UserAvatar from './UserAvatar';
import UserNotification from './UserNotification';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import { wordList } from '../../features/Word/dbWordList';
import { addWord } from '../../firebase/services';
import wordApi from '../../api/wordApi';

function LoggedIn() {
	const { user } = useContext(AuthContext);
	const { totalWords } = useContext(AppContext);
	const history = useHistory();
	const [isBtnLoading, setIsBtnLoading] = useState(false);

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
			<Box flexGrow={4}></Box>
			<LoadingButton
				variant="outlined"
				color="secondary"
				onClick={() => {
					history.push('/');
					newWord();
				}}
				loading={isBtnLoading}
				sx={{ left: 'unset', fontWeight: 600, fontSize: '17px' }}
			>
				New Word
			</LoadingButton>
			<Box flexGrow={4}></Box>
			<Box>
				<Tooltip title="Go to History">
					<NavLink to="/history" className="nav__link">
						History
					</NavLink>
				</Tooltip>
				{/* <Tooltip title="Go to Revision">
					<NavLink to="/revision" className="nav__link">
						Revision
					</NavLink>
				</Tooltip> */}
				<Tooltip title="Go to Trash">
					<NavLink to="/trash" className="nav__link">
						Trash
					</NavLink>
				</Tooltip>
			</Box>
			<Box>
				{/* <UserNotification /> */}
				<UserAvatar />
			</Box>
		</>
	);
}

function NotLoggedIn() {
	return (
		<Button size="large">
			<NavLink to="/login" className="nav__link">
				Log In
			</NavLink>
		</Button>
	);
}

export default function Header() {
	const { user } = useContext(AuthContext);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link className="logo" to="/">
						<h2>EVAWO</h2>
					</Link>
					<Box sx={{ flexGrow: 1 }} />
					{user?.uid ? <LoggedIn /> : <NotLoggedIn />}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
