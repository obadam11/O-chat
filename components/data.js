import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64';


// To avoid a common warning
import { YellowBox, Alert } from 'react-native';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
}


const firebaseConfig = {
    apiKey: "AIzaSyDlTYCFtvZ-bohe7kjzbOLSryMshurBeEg",
    authDomain: "todo-list-68c0e.firebaseapp.com",
    databaseURL: "https://todo-list-68c0e.firebaseio.com",
    projectId: "todo-list-68c0e",
    storageBucket: "todo-list-68c0e.appspot.com",
    messagingSenderId: "306762454858",
    appId: "1:306762454858:web:dd676a64dd511e758993b3",
    measurementId: "G-8CYW4DPGK8"
};

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Messages
export function sendMessageForDataBase(roomName, msg) {

    // firebase.firestore().collection(roomName).add({
    //     // user1,
    //     // user2: user2id,
    //     msg,
    //     sendTime: Date.now()
    // });

    let userEmail = firebase.auth().currentUser.email;
    firebase.firestore().collection("users").doc(userEmail).onSnapshot(doc => {
        firebase.firestore().collection(roomName).add({
            type: 'txt',
            msg,
            sendTime: firebase.firestore.FieldValue.serverTimestamp(),
            sender: doc.data().name
        })
    })

};


// Users Collection
export function addUser(email, uid, name) {
    firebase.firestore().collection("users").doc(email).set({
        uid: uid,
        name: name,
        rooms: []
    })
}

// Deleting the account
export function deleteUser(email) {
    firebase.firestore().collection("users").doc(email).delete()
        .then(() => alert("Account Deleted Successfully"))
        .catch((err) => alert(err))
}

// Create a root collection and post the first document
export function createRoom(roomName, user1Email, user2email) {

    firebase.firestore().collection(roomName).doc("fstmsg").set({
        type: "txt",
        user1Email,
        user2email,
        msg: "Welcome to this room",
        sendTime: firebase.firestore.FieldValue.serverTimestamp(),
        sender: 'bot'
    })
}
// When creating a room add it to the rooms list of each user 
export function addRoomToUsers(secUserEmail, roomName) {
    // Add the Room for the first User
    let thisUserEmail = firebase.auth().currentUser.email;

    firebase.firestore().collection("users").doc(thisUserEmail).update({
        rooms: firebase.firestore.FieldValue.arrayUnion(roomName)
    })

    // Add the Room for the second User
    firebase.firestore().collection("users").doc(secUserEmail).update({
        rooms: firebase.firestore.FieldValue.arrayUnion(roomName)
    })
}

// Only deleting the rooms from the users
export function deleteRoomUsers(roomName) {
    firebase.firestore().collection(roomName).doc("fstmsg").get()
        .then(doc => {
            // For the first user
            firebase.firestore().collection("users").doc(doc.data().user1Email).update({
                rooms: firebase.firestore.FieldValue.arrayRemove(roomName)
            })

            //For the second user
            firebase.firestore().collection("users").doc(doc.data().user2email).update({
                rooms: firebase.firestore.FieldValue.arrayRemove(roomName)
            })
        })
}

// Only deleting the room collection
// Review
export function deleteRoomColl(roomName) {
    firebase.firestore().collection(roomName).get().then(docs => {
        docs.forEach(doc => {
            firebase.firestore().collection(roomName).doc(doc.id).delete()
                .then(() => { })
                .catch(err => alert(err))
        })
    })
}


// Dealing With Firebase Storage (Images)

export const uploadImage = (uri, roomName) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
        firebase.firestore().collection(roomName).doc().set({
            type: 'img',
            url: uri,
            sender: doc.data().name,
            sendTime: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(async () => {
                const response = await fetch(uri);
                const blob = await response.blob();

                let refernce = firebase.storage().ref().child(`${roomName}/${Math.random()}`);
                console.log('finished uploading');
                return refernce.put(blob);

            })
            .catch(err => Alert.alert(err));
    })
    // const response = await fetch(uri);
    // const blob = await response.blob();

    // let refernce = firebase.storage().ref().child(`${roomName}/${Math.random()}`);
    // return refernce.put(blob);
}

export const downloadAllImages = (roomName, callBack) => {
    firebase.storage().ref(roomName).listAll().then(snap => {
        snap.items.forEach(itemRef => {
            itemRef.getDownloadURL().then(imgUrl => {
                callBack(imgUrl)


                    ;
            })
        })
    })
    // firebase.storage().ref(`${roomName}/${imageName}`).getDownloadURL()
    //     .then(url => {
    //         console.log(url)
    //     }, function (err) { console.log(err) })

    // let img = firebase.storage().ref(`${roomName}/second`);
    // const url = await img.getDownloadURL();
    // console.log(url);
}

export const downloadOneImg = (roomName, imgName, callBack) => {
    firebase.storage().ref(roomName + "/" + imgName).getDownloadURL()
        .then(url => {
            callBack(url)
        })
        .catch(err => Alert.alert(err))
}

export const deleteImage = (roomName, uri) => {
    firebase.storage().ref(`${roomName}/${uri}`).delete()
        .then(() => { })
        .catch(err => { Alert.alert(err) });
}