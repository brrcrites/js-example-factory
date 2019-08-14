
const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');
const firebaseStore = require('firebase/firestore');

const firebaseUi = require('firebaseui');

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

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var nickName = document.getElementById('nickName').value;
    
    var newUser = userFactory.createUser(firstName, lastName, nickName);

    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.replace('userInfo.html');
}

export function loadUserInfo() {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log(`Email:${user.email},First:${user.firstName},Last:${user.lastName},Nickname:${user.nickName},UID:${user.uid}`);

    var userdiv = document.getElementById('userInfo');

    var emailLiElement = document.createElement("LI");
    var emailTextElement = document.createTextNode(`Email: ${user.email}`);
    emailLiElement.appendChild(emailTextElement);
    userdiv.appendChild(emailLiElement);

    var firstLiElement = document.createElement("LI");
    var firstTextElement = document.createTextNode(`First: ${user.firstName}`);
    firstLiElement.appendChild(firstTextElement);
    userdiv.appendChild(firstLiElement);

    var lastLiElement = document.createElement("LI");
    var lastTextElement = document.createTextNode(`Last: ${user.lastName}`);
    lastLiElement.appendChild(lastTextElement);
    userdiv.appendChild(lastLiElement);

    var uidLiElement = document.createElement("LI");
    var uidTextElement = document.createTextNode(`UID: ${user.uid}`);
    uidLiElement.appendChild(uidTextElement);
    userdiv.appendChild(uidLiElement);
}

