// import { initializeApp } from 'firebase/app';
// import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from 'firebase/auth';
import Notiflix from 'notiflix';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBV_S9K2jJXB1fVA40WEnM-B4f5o18LF9A',
//   authDomain: 'filmoteka-d8cbe.firebaseapp.com',
//   projectId: 'filmoteka-d8cbe',
//   storageBucket: 'filmoteka-d8cbe.appspot.com',
//   messagingSenderId: '143990093654',
//   appId: '1:143990093654:web:66de61fe1cd4f2a24f08f7',
//   measurementId: 'G-KHYM7GSDS7',
// };
// const firebaseApp = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);

// connectAuthEmulator(auth, 'http://localhost:5000');

// const emailEl = document.querySelector('#authentication');

// async function loginEmailPassword(event) {
//   event.preventDefault();

//   const loginEmail = email.value;
//   const loginPassword = password.value;

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//     console.log(userCredential.user);
//     Notiflix.Notify.success('Logged in as ' + (userCredential.user.displayName || 'Anonymous'));
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure(error.code);
//   }
// }

// emailEl.addEventListener('submit', loginEmailPassword);

import {
  hideLoginError,
  showLoginState,
  showLoginForm,
  showApp,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
} from './ui';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBV_S9K2jJXB1fVA40WEnM-B4f5o18LF9A',
  authDomain: 'filmoteka-d8cbe.firebaseapp.com',
  projectId: 'filmoteka-d8cbe',
  storageBucket: 'filmoteka-d8cbe.appspot.com',
  messagingSenderId: '143990093654',
  appId: '1:143990093654:web:66de61fe1cd4f2a24f08f7',
  measurementId: 'G-KHYM7GSDS7',
});

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;

  if (email === '' && password === '') {
    Notiflix.Notify.failure("Fields can't be empty");
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);

      hideLoginError();
      hideLoginError();
    } else {
      showLoginForm();
      lblAuthState.innerHTML = `You're not logged in.`;
    }
  });
};

// Log out
const logout = async () => {
  await signOut(auth);
};

btnLogin.addEventListener('click', loginEmailPassword);
btnSignup.addEventListener('click', createAccount);
btnLogout.addEventListener('click', logout);

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, 'https://pahomeathome.github.io/filmoteka-old');

monitorAuthState();
