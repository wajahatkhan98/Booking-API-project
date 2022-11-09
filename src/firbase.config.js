import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyAKZukCltqjsj1TDgD-PgAwn9S6CVoDhIs',
	authDomain: 'creaditech-booking-jumaline.firebaseapp.com',
	projectId: 'creaditech-booking-jumaline',
	storageBucket: 'creaditech-booking-jumaline.appspot.com',
	messagingSenderId: '668041768648',
	appId: '1:668041768648:web:aedfbaab17e6f0325f7ffd',
	measurementId: 'G-6GP740DRVM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// auth.languageCode = 'it';

// const provider = new GoogleAuthProvider();

// export const signInGoogleAuth = () => {
// 	signInWithPopup(auth, provider)
// 		.then((result) => {
// 			// This gives you a Google Access Token. You can use it to access the Google API.
// 			const credential = GoogleAuthProvider.credentialFromResult(result);
// 			const token = credential.accessToken;
// 			// The signed-in user info.
// 			const user = result.user;
// 			// ...
// 		})
// 		.catch((error) => {
// 			// Handle Errors here.
// 			const errorCode = error.code;
// 			const errorMessage = error.message;
// 			// The email of the user's account used.
// 			const email = error.customData.email;
// 			// The AuthCredential type that was used.
// 			const credential = GoogleAuthProvider.credentialFromError(error);
// 			// ...
// 		});
// };
