import React, { createContext, useContext } from 'react';
import { useFirestoreList, useFirestoreUser } from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const userInfo = useFirestoreUser(user.uid);
	const { currentWord : word, totalWords, totalHistory, totalTrash } = userInfo;
	const historyList = useFirestoreList(user.uid, 'isInHistory');
	const trashList = useFirestoreList(user.uid, 'isInTrash');

	return (
		<AppContext.Provider
			value={{
				word,
				historyList,
				trashList,
				totalWords,
				totalHistory,
				totalTrash
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
