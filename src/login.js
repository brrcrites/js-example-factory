
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const firebaseStore = require('firebase/firestore');

const firebaseUi = require('firebaseui');

export function initialize() {

    firebase.initializeApp(firebaseConfig);

    var ui = new firebaseUi.auth.AuthUI(firebase.auth());

    var uiConfig = {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }
        ],
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                return true;
            },
            uiShown: function() {
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInSuccessUrl: 'success.html',
        tosUrl: '',
        privacyPolicyUrl: ''
    };

    ui.start('#firebaseui-auth-container', uiConfig);

}

