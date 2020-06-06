import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import Message from '../components/message';
import React from 'react';

// To avoid a common warning
import { YellowBox } from 'react-native';
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
            msg,
            sendTime: Date.now(),
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
export function createRoom(roomName, user1Id, user2email) {

    firebase.firestore().collection(roomName).add({
        msg: "Welcome to this room",
        sendTime: Date.now()
    })

    // firebase.firestore().collection("users").doc(user2email).get()
    //     .then(doc => {
    //         firebase.firestore().collection(roomName).add({
    //             // user1: user1Id,
    //             // user2: doc.data().uid,
    //             msg: 'Welcome to this room',
    //             sendTime: Date.now()
    //         })
    //     })
    //     .catch(err => alert(err));
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