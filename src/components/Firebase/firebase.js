import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC_OUrmQdScBtML3xsjP6XhDNcI-VG2688',
  authDomain: 'bird-checker.firebaseapp.com',
  databaseURL: 'https://bird-checker.firebaseio.com',
  projectId: 'bird-checker',
  storageBucket: '',
  messagingSenderId: '819379707704',
  appId: '1:819379707704:web:e9ba5e0f7b0f72e5362bcd'
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // AUTH API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
