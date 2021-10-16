import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@mui/material';
import '@fontsource/roboto';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from './context/AuthProvider';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/NotFound/NotFound';
import LoginPage from './features/Auth/pages/LoginPage';
import NewWordPage from './features/Word/pages/NewWordPage';
import HistoryWordPage from './features/Word/pages/HistoryWordPage';
import HistoryPage from './features/History/pages/HistoryPage';
import TrashPage from './features/History/pages/TrashPage';
import RevisionPage from './features/Revision/pages/RevisionPage';
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
	return (
		<React.Fragment>
			{/* <ThemeProvider theme={theme}> */}
			<Header />
			<Container>
				<div className="container">
					{uid ? (
						<Switch>
							<Redirect from="/login" to="/" />
							<Route path="/history/:word" component={HistoryWordPage} />
							<Route path="/history" component={HistoryPage} />
							<Route path="/trash" component={TrashPage} />
							{/* <Route path="/revision/:word" component={HistoryWordPage} /> */}
							<Route path="/revision/" component={RevisionPage} />
							<Route path="/user" component={UserPage} />
							<Route exact path="/" component={NewWordPage} />
							<Route path="*" component={NotFound} />
						</Switch>
					) : (
						<Switch>
							<Route path="/login" component={LoginPage} />
							<Route exact path="/" component={HomePage} />
							<Redirect from="*" to="/" />
						</Switch>
					)}
				</div>
			</Container>
			{/* </ThemeProvider> */}
		</React.Fragment>
	);
}
