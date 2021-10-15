import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import '@fontsource/roboto';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from './context/AuthProvider';
import { AppContext } from './context/AppProvider';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/NotFound/NotFound';
import LoginPage from './features/Auth/pages/LoginPage';
import WordPage from './features/Word/pages/WordPage';
import WordEditPage from './features/Word/pages/WordEditPage';
import HistoryPage from './features/History/pages/HistoryPage';
import TrashPage from './features/History/pages/TrashPage';
import UserPage from './features/User/pages/UserPage';

// const theme = createTheme({
// 	palette: {
// 		primary: {
// 			light: '#c158dc',
// 			main: '#8e24aa',
// 			dark: '#5c007a',
// 			contrastText: '#fff',
// 		},
// 		secondary: {
// 			light: '##ffad42',
// 			main: '#f57c00',
// 			dark: '#bb4d00',
// 			contrastText: '#000',
// 		},
// 		white: {
// 			main: '#fff',
// 		},
// 	},
// });

export default function App() {
	const {
		user: { uid },
	} = useContext(AuthContext);
	const { isLoading } = useContext(AppContext);
	return (
		<React.Fragment>
			{/* <ThemeProvider theme={theme}> */}
			<Header />
			<Container>
				<div className="container">
					<Switch>
						<Route path="/login">
							{uid ? (
								isLoading ? (
									<CircularProgress />
								) : (
									<Redirect to="/" />
								)
							) : (
								<LoginPage />
							)}
						</Route>
						<Route path="/history/:word">
							{uid ? <WordEditPage /> : <Redirect to="/" />}
						</Route>
						<Route path="/history">{uid ? <HistoryPage /> : <Redirect to="/" />}</Route>
						<Route path="/trash">{uid ? <TrashPage /> : <Redirect to="/" />}</Route>
						<Route path="/user">{uid ? <UserPage /> : <Redirect to="/" />}</Route>
						<Route exact path="/">
							{uid ? <WordPage /> : <HomePage />}
						</Route>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Container>
			{/* </ThemeProvider> */}
		</React.Fragment>
	);
}
