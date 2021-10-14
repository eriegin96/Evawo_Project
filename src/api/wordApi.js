import axios from 'axios';
import queryString from 'query-string';
import firebase from 'firebase/app';

const getFirebaseToken = async () => {
	const currentUser = firebase.auth().currentUser;
	if (currentUser) {
		return currentUser.getIdToken();
	}

	// Not logged in
	const hasRememberedAccount = localStorage.getItem('account');
	if (!hasRememberedAccount) return null;

	// Logged in but currentUser is not fetched -> wait 10s
	// đợi fetch
	return new Promise((resolve, reject) => {
		const waitTimer = setTimeout(() => {
			reject(null);
			console.log('Reject timeout');
		}, 5000);

		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				reject(null);
			}

			const token = await user.getIdToken();
			console.log('[AXIOS] Logged in user token: ', token);
			resolve(token);

			unregisterAuthObserver();
			clearTimeout(waitTimer);
		});
	});
};

const axiosClient = axios.create({
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await getFirebaseToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			const res = response.data;
			const newData = {
				word: res[0].word || '',
				phonetic: res[0].phonetics[0].text || '',
				audio: res[0].phonetics[0].audio || '',
				origin: res[0].origin || '',
				type: res[0].meanings[0].partOfSpeech || '',
				definition: res[0].meanings[0].definitions[0].definition || '',
				example: res[0].meanings[0].definitions[0].example || '',
				synonyms: res[0].meanings[0].definitions[0].synonyms.slice(0, 5).join('; ') || '',
				antonyms: res[0].meanings[0].definitions[0].antonyms.slice(0, 5).join('; ') || '',
			};
			return newData;
			// return response.data;
		}
		return response;
	},
	(error) => {
		throw error;
	}
);

const wordApi = {
	getWord: (params) => {
		const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${params}`;
		return axiosClient.get(url);
	},
};

export default wordApi;
