import firebase from "firebase";

export default class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
          apiKey: "AIzaSyAW-9X4h-r3OQ3ZIRINZyvlIZIgAnbWyWs",
          authDomain: "test1-ecf53.firebaseapp.com",
          databaseURL: "https://test1-ecf53.firebaseio.com",
          projectId: "test1-ecf53",
          storageBucket: "test1-ecf53.appspot.com",
          messagingSenderId: "495012802420"
        });

        //let messaging = firebase.messaging();
    }
}
