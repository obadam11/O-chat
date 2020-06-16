import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { call } from 'react-native-reanimated';


// To avoid a common warning
// import { YellowBox, Alert } from 'react-native';
// import _ from 'lodash';
// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//     if (message.indexOf('Setting a timer') <= -1) {
//         _console.warn(message);
//     }
// }


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
        rooms: [],
        img: 'none'
    })
}

export function getUserNameFromDB(callBack) {
    const user = firebase.auth().currentUser.email;
    firebase.firestore().collection("users").doc(user).get().then(doc => {
        callBack(doc.data().name)
    })
}

export function userImage(callBack) {
    const user = firebase.auth().currentUser.email;
    firebase.firestore().collection('users').doc(user).get().then(doc => {
        callBack(doc.data().img)
    })
}

// Deleting the account
export function deleteUser(email) {
    firebase.firestore().collection("users").doc(email).delete()
        .then(() => alert("Account Deleted Successfully"))
        .catch((err) => alert(err))
}

function addRoomToCollection(roomName) {
    firebase.firestore().collection("rooms").doc(roomName).set({
        name: roomName
    })
}
function deleteRoomFromCollection(roomName) {
    firebase.firestore().collection('rooms').doc(roomName).delete()
        .then(() => { })
        .catch(() => { })
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
        .then(() => {
            addRoomToCollection(roomName)
        })
        .catch(err => { })
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
                .then(() => { deleteRoomFromCollection() })
                .catch(err => { })
        })
    })
}


// Dealing With Firebase Storage (Images)

export const uploadImage = (uri, roomName) => {
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
        firebase.firestore().collection(roomName).doc().set({
            type: 'img',
            // url: uri,
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

export const deleteImage = async (roomName, uri) => {
    await firebase.storage().ref(`${roomName}/${uri}`).delete()
}

export const uplaodProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
    })

    if (!result.cancelled) {
        const userEmail = firebase.auth().currentUser.email;
        let referance = firebase.storage().ref().child(`users/${userEmail}`);
        const response = await fetch(result.uri);
        const blob = await response.blob();

        referance.put(blob).then(() => {
            firebase.storage().ref(`users/${userEmail}`).getDownloadURL().then(imgUrl => {
                firebase.firestore().collection('users').doc(userEmail).update({
                    img: imgUrl
                })
            })
                .catch(err => Alert.alert(err))
        })
    }
}

export const getUserEmailFromDB = (callBack) => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.email).get().then(doc => {
        callBack(doc.id);
    })
}

export function deleteAccount(callBack) {
    deleteUser(firebase.auth().currentUser.email);
    firebase.auth().currentUser.delete().then(() => {
        callBack();
    })
    // .catch(err => { Alert.alert(err) })
}

export function logOut(callBack) {
    firebase.auth().signOut()
        .then(() => { callBack() })
        .catch(err => { Alert.alert(err) })
}

export function changeUserName(oldName, newName, callBack) {
    const currentUser = firebase.auth().currentUser.email;

    firebase.firestore().collection('users').doc(currentUser).update({
        name: newName
    })
        .then(() => {
            firebase.firestore().collection('users').doc(currentUser).get().then(doc => {
                doc.data().rooms.forEach(room => {
                    firebase.firestore().collection(room).get().then(docs => {
                        docs.forEach(msg => {
                            if (msg.id != 'fstmsg') {
                                if (msg.sender == oldName) {
                                    firebase.firestore().collection(room).doc(msg.id).update({
                                        sender: newName
                                    })
                                        .then(() => { console.log('good') })
                                        .catch((err) => console.log(err))
                                }
                            }
                        })
                    })
                })
            })
            callBack()
        })
        .catch((err) => Alert.alert(err));



}