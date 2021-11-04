import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@mui/material';
import '@fontsource/roboto';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthContext } from './context/AuthProvider';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/NotFound/NotFound';
import LoginPage from './features/Auth/pages/LoginPage';
import NewWordPage from './features/Word/pages/NewWordPage';
import HistoryWordPage from './features/Word/pages/HistoryWordPage';
import HistoryPage from './features/History/pages/HistoryPage';
import TrashPage from './features/History/pages/TrashPage';
// import RevisionPage from './features/Revision/pages/RevisionPage';
import UserPage from './features/User/pages/UserPage';

const theme = createTheme({
	palette: {
		type: 'light',
    primary: {
      main: '#616664',
    },
		secondary: {
			main: '#fff'
		},
    background: {
      default: '#e8d5b4',
    },
	},
});

export default function App() {
	const {
		user: { uid },
	} = useContext(AuthContext);
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
			<Header />
			<Container>
				<div className="container">
					{uid ? (
						<Switch>
							<Redirect from="/login" to="/" />
							<Route path="/history/:word" component={HistoryWordPage} />
							<Route path="/history" component={HistoryPage} />
							<Route path="/trash" component={TrashPage} />
							{/* <Route path="/revision/" component={RevisionPage} /> */}
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
			</ThemeProvider>
		</React.Fragment>
	);
}
