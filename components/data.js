import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import FirebaseKey from '../firebaseKey';

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


const firebaseConfig = FirebaseKey;

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Messages

export const getTime = () => {
    let today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let now = 'AM';

    if (hours > 12) {
        now = 'PM';
        hours = hours - 12;
    }

    return `${hours}:${minutes} ${now}`;
}

export function sendMessageForDataBase(roomName, msg) {
    let userEmail = firebase.auth().currentUser.email;
    firebase.firestore().collection("users").doc(userEmail).onSnapshot(doc => {
        firebase.firestore().collection(roomName).add({
            type: 'txt',
            msg,
            sendTime: firebase.firestore.FieldValue.serverTimestamp(),
            sender: doc.data().name,
            time: getTime()
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

// Get the userName for a specific user
export function getUserNameFromDB(callBack) {
    const user = firebase.auth().currentUser.email;
    firebase.firestore().collection("users").doc(user).get().then(doc => {
        callBack(doc.data().name)
    })
}

// Get the user download Image URL
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

// Add the room to the room's collection
function addRoomToCollection(roomName) {
    firebase.firestore().collection("rooms").doc(roomName).set({
        name: roomName
    })
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
// 3
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
            });
        })
}

// Only deleting the room collection
// 1
export function deleteRoomColl(roomName) {
    firebase.firestore().collection(roomName).get().then(docs => {
        docs.forEach(doc => {
            firebase.firestore().collection(roomName).doc(doc.id).delete()
                // .then(() => { deleteRoomFromCollection() })
                .then(() => { })
                .catch(err => { Alert.alert(err) })
        })
    })
}

// Remove the room from the room's collection
// 2
export function deleteRoomFromCollection(roomName) {
    firebase.firestore().collection('rooms').doc(roomName).delete()
        .then(() => { })
        .catch(() => { })
}

// Not working yet!!!
// 4
export const deleteAllImages = (roomName) => {
    firebase.storage().ref().child(roomName).listAll().then(res => {
        console.log(res.items.length);
        res.items.forEach(img => {
            img.delete()
                .then(() => { })
                .catch(err => Alert.alert(err))
        })
    })

}


// Dealing With Firebase Storage (Images)

// Upload image to firebase storage (Not used througout the program)
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
}

// Download all images from the firebase storage for a specific room
export const downloadAllImages = (roomName, callBack) => {
    firebase.storage().ref(roomName).listAll().then(snap => {
        snap.items.forEach(itemRef => {
            itemRef.getDownloadURL().then(imgUrl => {
                callBack(imgUrl)
                    ;
            })
        })
    })
}

// Download a single image
export const downloadOneImg = (roomName, imgName, callBack) => {
    firebase.storage().ref(roomName + "/" + imgName).getDownloadURL()
        .then(url => {
            callBack(url)
        })
        .catch(err => Alert.alert(err))
}



// Upload the profile image to the firebase storage
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

// get the user email
export const getUserEmailFromDB = (callBack) => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.email).get().then(doc => {
        callBack(doc.id);
    })
}

// Delete account
export function deleteAccount(callBack) {
    deleteUser(firebase.auth().currentUser.email);
    firebase.auth().currentUser.delete().then(() => {
        callBack();
    })
    // .catch(err => { Alert.alert(err) })
}

// Log out
export function logOut(callBack) {
    firebase.auth().signOut()
        .then(() => { callBack() })
        .catch(err => { Alert.alert(err) })
}

export function emailExsists(email, callBack, callBack2) {
    firebase.firestore().collection('users').onSnapshot(docs => {
        docs.forEach(doc => {
            if (email == doc.id) {
                // console.log(true);
                callBack()
            }
            else {
                // console.log(false)
                callBack2();
            }
        })
    })
}