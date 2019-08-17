# JavaScript Factory Pattern Example

This shows how you can use the factory pattern to more easily create new users for your site without the developer creating those new users knowinng the inner working of initializing the objects.

## Setup

* Create a new Firebase project and add a web app to your Firebase project
* Install the `firebase-cli` tools and use `firebase login` to log into the Google account associated with Firebase
* Clone this repository and initialize it using `firebase init` and link it to the web app you just created
* Copy your apps configuration snippet (Settings > Project settings > Your Apps > Firebase SDK Snippet > Config) to a config.js file in the public/ directory
* Go to the Authentication page for your project and under "Sign-in method" enable the first case under "Email/Password" authentication
* Run `npm install` to download all the dependencies and run `npm start` to run webpack and start the project locally
* Optionally run `npm run deploy` to package up the project and deploy it to Firebase

## References

Here is a (more or less) complete list of all the references that I used for creating this example. I am not a native web developer so they span a number of topics including working with firebase, using webpack to allow the code onto browsers, HTML5 storage, and working with DOM elements. I used a previous project to reference the HTML elements that I needed to build (although there are very few).

* [Easily add sign-on to your Web App with FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui)
* [Add Firebase to your JavaScript Project](https://firebase.google.com/docs/web/setup)
* [Build your First Simple App with Firebase](https://neoteric.eu/blog/building-your-first-simple-app-with-firebase/)
* [Firebase NPM Entry](https://www.npmjs.com/package/firebase)
* [Webpack - Getting Started](https://webpack.js.org/guides/getting-started/)
* [Stack Overflow - Calling webpack code from outside (HTML script tag)](https://stackoverflow.com/questions/34357489/calling-webpacked-code-from-outside-html-script-tag)
* [Webpack - Expose the Library](https://webpack.js.org/guides/author-libraries/#expose-the-library)
* [Managing Users in Firebase](https://firebase.google.com/docs/auth/web/manage-users)
* [Stack Overflow - Persist variables between page loads](https://stackoverflow.com/questions/29986657/persist-variables-between-page-loads/30070207)
* [W3Schools - HTML5 Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)
* [Stack Overflow - Storing Objects in HTML5 localStorage](https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage)
* [W3Schools - HOW TO - Redirect to Another Webpage](https://www.w3schools.com/howto/howto_js_redirect_webpage.asp)
* [Stack Overflow - JavaScript - Getting HTML Form Values](https://stackoverflow.com/questions/3547035/javascript-getting-html-form-values)
* [W3Schools - HTML DOM appendChild() Method](https://www.w3schools.com/jsref/met_node_appendchild.asp)
