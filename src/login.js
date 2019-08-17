const firebase = require('firebase/app');
const firebaseUi = require('firebaseui');
require('firebase/auth')
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

class User {
    constructor(uid, email, displayName, address1, address2, city, state, zip) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;

        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}

class Factory {
    createUser(address1, address2, city, state, zip) {
        var user = firebase.auth().currentUser;
        return new User(user.uid, user.email, user.displayName, address1, address2, city, state, zip);
        // Note that the uid, email, and displayName are gathered from the user account automatically
        // and are not passed into the function, but are still filled into the user object
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
        signInSuccessUrl: 'form.html',
        tosUrl: '',
        privacyPolicyUrl: ''
    };

    ui.start('#firebaseui-auth-container', uiConfig);
}

export function mintUser() {
    var userFactory = new Factory();

    var address1 = $('#address1').val();
    var address2 = $('#address2').val();
    var city = $('#city').val();
    var state = $('#state').val();
    var zip = $('#zip').val();
    
    var newUser = userFactory.createUser(address1, address2, city, state, zip);

    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.replace('info.html');
}

export function loadUserInfo() {
    var user = JSON.parse(localStorage.getItem('user'));
    var userdiv = document.getElementById('userInfo');

    $('#userInfo').append(`<li>UID: ${user.uid}</li>`);
    $('#userInfo').append(`<li>Email: ${user.email}</li>`);
    $('#userInfo').append(`<li>Name: ${user.displayName}</li>`);
    $('#userInfo').append(`<li>Address1: ${user.address1}</li>`);
    $('#userInfo').append(`<li>Address2: ${user.address2}</li>`);
    $('#userInfo').append(`<li>City: ${user.city}</li>`);
    $('#userInfo').append(`<li>State: ${user.state}</li>`);
    $('#userInfo').append(`<li>Zip: ${user.zip}</li>`);
}

