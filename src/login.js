const firebase = require('firebase/app');
const firebaseUi = require('firebaseui');
require('firebase/auth');
require('firebase/firestore');

/*
import firebase from 'firebase/app';
import firebaseUi from 'firebaseui';
import 'firebase/auth';
import 'firebase/firestore';
*/

firebase.initializeApp(firebaseConfig);

class User {
    constructor(email, firstName, lastName, nickName, uid) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = nickName;
        this.uid = uid;
    }

    async save() {
        console.log('Saving user data with uid', this.uid);
        var db = firebase.firestore();
        await db.collection('users').doc(this.uid).set({
            email: this.email,
            first: this.firstName,
            last: this.lastName,
            nickname: this.nickName
        });
        console.log('Done saving user with uid', this.uid);
    }
}

class Factory {
    createUser(firstName, lastName, nickName) {
        var user = firebase.auth().currentUser;
        var email = user.email;
        var uid = user.uid;
        var user = new User(email, firstName, lastName, nickName, uid);
        console.log('About to save user to firestore');
        user.save();
        console.log('Done saving user to firestore');
        return user;
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

