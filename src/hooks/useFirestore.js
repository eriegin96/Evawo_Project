import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFirestoreList = (uid, target) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let collectionRef = db.collection(`users/${uid}/words`);

		collectionRef = collectionRef.where(target, '==', true);

		const unsubscribe = collectionRef.onSnapshot((snapshot) => {
			const documents = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setDocuments(documents);
		});

		return unsubscribe;
	}, [uid, target]);

	return documents;
};

export const useFirestoreUser = (uid) => {
	const [documents, setDocuments] = useState({});

	useEffect(() => {
		let docRef = db.doc(`users/${uid}`);

		const unsubscribe = docRef.onSnapshot((snapshot) => {
			const documents = snapshot.data() || {};
			setDocuments(documents);
		});

		return unsubscribe;
	}, [uid]);

	return documents;
};

export const useFirestoreWordEdit = (uid, word) => {
	const [document, setDocument] = useState(null);

	useEffect(() => {
		let collectionRef = db.collection(`users/${uid}/words`);

		collectionRef = collectionRef.where('word', '==', word).where('isInArchive', '==', false);

		const unsubscribe = collectionRef.onSnapshot((snapshot) => {
			const documents = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setDocument(documents[0]);
		});

		return unsubscribe;
	}, [uid, word]);

	return document;
};
