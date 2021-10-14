import React, { createContext, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/services';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			if (user) {
				getUserData(user.uid).then((userData) => {
					setUser(userData);
					setIsAuthLoading(false);
				});

				return;
			}

			// reset user info
			setUser({});
			setIsAuthLoading(false);
		});

		// clean function
		return () => {
			unsubscribed();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{isAuthLoading ? <LinearProgress /> : children}
		</AuthContext.Provider>
	);
}
