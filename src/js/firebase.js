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

import { AuthErrorCodes } from 'firebase/auth';
import { over } from 'lodash';

const overlayEl = document.createElement('div');
overlayEl.classList.add('firebase-overlay');

document.querySelector('body').prepend(overlayEl);

overlayEl.insertAdjacentHTML(
  'beforeend',
  `<div class="firebase-modal">
      <div id="login">
        <form class="firebase-form">
          <button type="button" class="login__close-btn">&#9587;</button>
          <div class="group">
            <input id="txtEmail" type="email">
            <label>Email</label>
          </div>
          <div class="group">
            <input id="txtPassword" type="password">
            <label>Password</label>
          </div>
          <div id="divLoginError" class="group">
            <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
          </div>
          <button id="btnLogin" type="button" class="button buttonBlue">Log in</button>
          <button id="btnSignup" type="button" class="button buttonBlue">Sign up</button>
        </form>
      </div>
    
      <div id="app">
        <form>
          <button type="button" class="auth__close-btn">&#9587;</button>
          <div class="group">
            <div id="lblAuthState" class="authlabel"></div>
          </div>
          <button id="btnLogout" type="button" class="button buttonBlue">Log out</button>
        </form>
      </div>
    </div>`,
);

export const txtEmail = document.querySelector('#txtEmail');
export const txtPassword = document.querySelector('#txtPassword');

export const btnLogin = document.querySelector('#btnLogin');
export const btnSignup = document.querySelector('#btnSignup');

export const btnLogout = document.querySelector('#btnLogout');

export const divAuthState = document.querySelector('#divAuthState');
export const lblAuthState = document.querySelector('#lblAuthState');

export const divLoginError = document.querySelector('#divLoginError');
export const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');

export const showLoginForm = () => {
  login.style.display = 'block';
  app.style.display = 'none';
};

export const showApp = () => {
  login.style.display = 'none';
  app.style.display = 'block';
};

export const hideLoginError = () => {
  divLoginError.style.display = 'none';
  lblLoginErrorMessage.innerHTML = '';
};

export const showLoginError = error => {
  divLoginError.style.display = 'block';
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
  } else {
    lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
  }
};

export const showLoginState = user => {
  lblAuthState.innerHTML = `You're logged in as ${user.displayName || 'Guest'} <br>  <br> uid: ${
    user.uid
  }</span>, <br> <br> email: ${user.email} `;
};

hideLoginError();

const overlay = document.querySelector('.firebase-overlay');
const firebaseModal = document.querySelector('.firebase-modal');

const loginLink = document.querySelector('.login-link');
const loginCloseButton = document.querySelector('.login__close-btn');
const authCloseButton = document.querySelector('.auth__close-btn');

loginLink.addEventListener('click', openFirebaseModal);
loginCloseButton.addEventListener('click', closeFirebaseModal);
authCloseButton.addEventListener('click', closeFirebaseModal);

function openFirebaseModal(event) {
  event.preventDefault();
  overlay.classList.toggle('open');
  firebaseModal.classList.toggle('open');
}

function closeFirebaseModal() {
  overlay.classList.toggle('open');
  firebaseModal.classList.toggle('open');
}

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
    overlay.classList.toggle('open');
    firebaseModal.classList.toggle('open');
    loginLink.innerHTML = '👤 Guest';
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
    overlay.classList.toggle('open');
    firebaseModal.classList.toggle('open');
    loginLink.innerHTML = '👤 Guest';
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
      loginLink.innerHTML = '👤 Guest';
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
  loginLink.innerHTML = 'Log in';
};

btnLogin.addEventListener('click', loginEmailPassword);
btnSignup.addEventListener('click', createAccount);
btnLogout.addEventListener('click', logout);

const auth = getAuth(firebaseApp);

monitorAuthState();
