import React from 'react';
import { Button, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import google from '../../../resources/img/google.svg';
import './loginForm.scss';
import { addUser } from '../../../firebase/services';
import firebase, { auth } from '../../../firebase/config';

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const providers = { 'google.com': googleProvider, 'facebook.com': facebookProvider };

const checkUserExist = (additionalUserInfo, user) => {
	if (additionalUserInfo?.isNewUser) {
		addUser(user.uid, {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
			providerId: additionalUserInfo.providerId,
		});
		return;
	}
};

export default function LoginForm() {
	const handleLogin = async (provider) => {
		auth.signInWithPopup(provider)
			.then((result) => {
				const { additionalUserInfo, user } = result;
				checkUserExist(additionalUserInfo, user);
			})
			.catch((error) => {
				const pendingCred = error.credential;
				const email = error.email;

				if (error.code === 'auth/account-exists-with-different-credential') {
					auth.fetchSignInMethodsForEmail(email).then((methods) => {
						const confirmation = window.confirm(
							'Your email is already connected with another provider. Do you want to link to that account?'
						);

						if (confirmation === true) {
							auth.signInWithPopup(providers[methods]).then((result) =>
								result.user.linkWithCredential(pendingCred)
							);
							return;
						}
					});
				}
			});
	};

	return (
		<div className="form__wrapper">
			<Paper className="form__container" elevation={3}>
				<h2>Login</h2>
				<div className="form__group">
					<div className="form__item">
						<Button
							onClick={() => handleLogin(googleProvider)}
							className="form__btn form__btn--google"
						>
							<img src={google} alt="" />
							<span className="form__text">Sign in with Google</span>
						</Button>
					</div>
					<div className="form__item">
						<Button
							onClick={() => handleLogin(facebookProvider)}
							className="form__btn form__btn--facebook"
						>
							<FacebookIcon />
							<span className="form__text">Sign in with Facebook</span>
						</Button>
					</div>
				</div>
			</Paper>
		</div>
	);
}
