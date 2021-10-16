import firebase, { db } from './config';

const increase = (value) => {
	return firebase.firestore.FieldValue.increment(value);
};

const editList = (uid, wordIds, wordRefData, userRefData) => {
	const batch = db.batch();
	const userRef = db.doc(`users/${uid}`);
	const wordsRef = db.collection(`users/${uid}/words`);

	for (let i = 0; i < wordIds.length; i++) {
		batch.update(wordsRef.doc(wordIds[i].toString()), wordRefData);
		batch.update(userRef, userRefData);
	}

	batch.commit();
};

export const getUserData = (uid) => {
	const userRef = db.doc(`users/${uid}`);
	return userRef
		.get()
		.then((user) => {
			if (user.exists) {
				return user.data();
			} else {
				return {};
			}
		})
		.catch((error) => {
			console.log('Error getting user:', error);
		});
};

export const addUser = (uid, data) => {
	const userRef = db.doc(`users/${uid}`);

	userRef.set({
		...data,
		currentWord: {},
		totalWords: 0,
		totalHistory: 0,
		totalTrash: 0,
		totalArchive: 0,
		totalRevision: 0,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	});
};

export const addWord = (uid, wordId, data) => {
	const userRef = db.doc(`users/${uid}`);
	const wordRef = db.doc(`users/${uid}/words/${wordId}`);

	userRef.update({
		currentWord: { ...data },
		totalWords: increase(1),
		totalHistory: increase(1),
	});
	wordRef.set({
		...data,
		isInHistory: true,
		isInTrash: false,
		isInArchive: false,
		isInRevision: false,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	});
};

export const updateWord = (uid, wordId, data) => {
	const wordRef = db.doc(`users/${uid}/words/${wordId}`);

	wordRef.update({ ...data });
};

export const removeToTrash = (uid, wordIds) => {
	const wordRefData = { isInHistory: false, isInTrash: true };
	const userRefData = { totalHistory: increase(-1), totalTrash: increase(1) };
	editList(uid, wordIds, wordRefData, userRefData);
};

export const restoreToHistory = (uid, wordIds) => {
	const wordRefData = { isInHistory: true, isInTrash: false };
	const userRefData = { totalHistory: increase(1), totalTrash: increase(-1) };
	editList(uid, wordIds, wordRefData, userRefData);
};

export const removeToArchive = (uid, wordIds) => {
	const wordRefData = { isInTrash: false, isInArchive: true };
	const userRefData = { totalTrash: increase(-1), totalArchive: increase(1) };
	editList(uid, wordIds, wordRefData, userRefData);
};

export const addToRevision = (uid, wordIds) => {
	const wordRefData = { isInRevision: true };
	const userRefData = { totalRevision: increase(1) };
	editList(uid, wordIds, wordRefData, userRefData);
};

export const editRevision = (uid, wordId, data) => {
	const wordRef = db.doc(`users/${uid}/words/${wordId}`);
	wordRef.update({ revisionTime: firebase.firestore.FieldValue.serverTimestamp() });
};

export const removeFromRevision = (uid, wordIds) => {
	const wordRefData = { isInRevision: true };
	const userRefData = { totalRevision: increase(-1) };
	editList(uid, wordIds, wordRefData, userRefData);
};
