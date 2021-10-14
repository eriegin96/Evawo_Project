import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFirestoreList, useFirestoreUser } from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const word = useFirestoreUser(user.uid).currentWord;
	const totalWords = useFirestoreUser(user.uid).totalWords;
	const historyList = useFirestoreList(user.uid, 'isInHistory');
	const trashList = useFirestoreList(user.uid, 'isInTrash');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (word) setIsLoading(false);
	}, [word]);

	return (
		<AppContext.Provider
			value={{
				word,
				historyList,
				trashList,
				totalWords,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
