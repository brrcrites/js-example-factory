const firebase = require('firebase/app');
const firebaseUi = require('firebaseui');
require('firebase/auth')
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

class User {
    constructor(email, firstName, lastName, nickName, uid) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = nickName;
        this.uid = uid;
    }
}

class Factory {
    createUser(firstName, lastName, nickName) {
        var user = firebase.auth().currentUser;
        var email = user.email;
        var uid = user.uid;
        return new User(email, firstName, lastName, nickName, uid);
    }
}

export function initializeAuth() {
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

export function mintUser() {
    var userFactory = new Factory();

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var nickName = $('#nickName').val();
    
    var newUser = userFactory.createUser(firstName, lastName, nickName);

    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.replace('userInfo.html');
}

export function loadUserInfo() {
    var user = JSON.parse(localStorage.getItem('user'));
    var userdiv = document.getElementById('userInfo');

    $('#userInfo').append(`<li>Email: ${user.email}</li>`);
    $('#userInfo').append(`<li>First: ${user.firstName}</li>`);
    $('#userInfo').append(`<li>Last: ${user.lastName}</li>`);
    $('#userInfo').append(`<li>Nickname: ${user.nickName}</li>`);
    $('#userInfo').append(`<li>UID: ${user.uid}</li>`);
}

