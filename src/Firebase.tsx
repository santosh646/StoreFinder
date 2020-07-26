import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCe5HQ4mRbl7ziXaTQR41_xZtKFBEUQ4RA",
    authDomain: "storefinder-5b1d0.firebaseapp.com",
    databaseURL: "https://storefinder-5b1d0.firebaseio.com",
    projectId: "storefinder-5b1d0",
    storageBucket: "storefinder-5b1d0.appspot.com",
    messagingSenderId: "159378755671",
    appId: "1:159378755671:web:cacdc419549140c5981312"
};
firebase.initializeApp(config);

export default firebase;