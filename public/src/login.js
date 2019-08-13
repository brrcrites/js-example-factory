
function initialize() {
    var firebase = require('firebase');
    var firebaseui = require('firebaseui');

    firebase.initializeApp(firebaseConfig);

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            }
        ]
    });
}

