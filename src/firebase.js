import firebase from "firebase/app";
import '@firebase/messaging';

const config = {
    messaggingSenderId: '253304754833'
}

firebase.initializeApp(config);

let messaging;

permitToNotify() {
    const messaging = firebase.messaging();
    messaging.requestPermission()
        .then(() => messaging.getToken().then(token => this.displayToken = token))
        .catch(err => {
            console.log('Unable to get permission to notify.', err);
        });
}

// we need to check if messaging is supported by the browser
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

export {
    messaging
};