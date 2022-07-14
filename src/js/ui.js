// import { AuthErrorCodes } from 'firebase/auth';
// import { over } from 'lodash';

// export const txtEmail = document.querySelector('#txtEmail');
// export const txtPassword = document.querySelector('#txtPassword');

// export const btnLogin = document.querySelector('#btnLogin');
// export const btnSignup = document.querySelector('#btnSignup');

// export const btnLogout = document.querySelector('#btnLogout');

// export const divAuthState = document.querySelector('#divAuthState');
// export const lblAuthState = document.querySelector('#lblAuthState');

// export const divLoginError = document.querySelector('#divLoginError');
// export const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage');

// export const showLoginForm = () => {
//   login.style.display = 'block';
//   app.style.display = 'none';
// };

// export const showApp = () => {
//   login.style.display = 'none';
//   app.style.display = 'block';
// };

// export const hideLoginError = () => {
//   divLoginError.style.display = 'none';
//   lblLoginErrorMessage.innerHTML = '';
// };

// export const showLoginError = error => {
//   divLoginError.style.display = 'block';
//   if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
//     lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
//   } else {
//     lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
//   }
// };

// export const showLoginState = user => {
//   lblAuthState.innerHTML = `You're logged in as ${user.displayName || 'Guest'} <br>  <br> uid: ${
//     user.uid
//   }</span>, <br> <br> email: ${user.email} `;
// };

// hideLoginError();

// const overlayEl = document.createElement('div');
// overlayEl.classList.add('firebase-overlay');

// document.querySelector('body').prepend(overlayEl);

// overlayEl.insertAdjacentHTML(
//   'beforeend',
//   `<div class="firebase-modal">
//       <div id="login">
//         <form class="firebase-form">
//           <button type="button" class="login__close-btn">&#9587;</button>
//           <div class="group">
//             <input id="txtEmail" type="email">
//             <label>Email</label>
//           </div>
//           <div class="group">
//             <input id="txtPassword" type="password">
//             <label>Password</label>
//           </div>
//           <div id="divLoginError" class="group">
//             <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
//           </div>
//           <button id="btnLogin" type="button" class="button buttonBlue">Log in</button>
//           <button id="btnSignup" type="button" class="button buttonBlue">Sign up</button>
//         </form>
//       </div>

//       <div id="app">
//         <form>
//           <button type="button" class="auth__close-btn">&#9587;</button>
//           <div class="group">
//             <div id="lblAuthState" class="authlabel"></div>
//           </div>
//           <button id="btnLogout" type="button" class="button buttonBlue">Log out</button>
//         </form>
//       </div>
//     </div>`,
// );

// const overlay = document.querySelector('.firebase-overlay');
// const firebaseModal = document.querySelector('.firebase-modal');

// const loginLink = document.querySelector('.login-link');
// const loginCloseButton = document.querySelector('.login__close-btn');
// const authCloseButton = document.querySelector('.auth__close-btn');

// loginLink.addEventListener('click', openFirebaseModal);
// loginCloseButton.addEventListener('click', closeFirebaseModal);
// authCloseButton.addEventListener('click', closeFirebaseModal);

// function openFirebaseModal(event) {
//   event.preventDefault();
//   overlay.classList.toggle('open');
//   firebaseModal.classList.toggle('open');
// }

// function closeFirebaseModal() {
//   overlay.classList.toggle('open');
//   firebaseModal.classList.toggle('open');
// }
