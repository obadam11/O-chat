import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createRoom, addRoomToUsers, emailExsists } from '../components/data';
import firebase from 'firebase';
import 'firebase/firestore';
import 'react-navigation';


export default function RoomNameText({ navigation, text, email }) {

    const [isAvailbale, setIsAvailable] = useState(false);
    const [emailAvailbale, setEmailAvailbale] = useState(false);

    const available = () => {
        console.log('here');
        firebase.firestore().collection("rooms").get().then(docs => {
            docs.forEach(doc => {
                if (text == doc.data().name || text === 'rooms' || text === 'users') {
                    setIsAvailable(false);
                    console.log(doc.data().name)
                }
                else {
                    setIsAvailable(true);
                    console.log(doc.data().name);
                }
            })
        })
    }

    const createRoomHandler = () => {
        const creatingRoom = () => {
            let currentUserEmail = firebase.auth().currentUser.email;
            createRoom(text, currentUserEmail, email);
            addRoomToUsers(email, text);
            navigation.navigate("AllRooms");
        }

        emailExsists(email, () => {
            setEmailAvailbale(true)
            console.log(true);
        }, () => {
            setEmailAvailbale(false);
            console.log(false);
        })

        if (emailAvailbale) {
            creatingRoom();
        }
        else {
            Alert.alert("Email Not found", "The user's email you passed to join the room isn't found. Maybe this user is not signed up to our app")
        }

        // firebase.firestore().collection('users').get().then(docs => {
        //     docs.forEach(doc => {
        //         if (doc.id == props.email) {
        //             creatingRoom();
        //         }
        //         else {
        //             Alert.alert("Sorry!", "This user email doesn't exists!")
        //         }
        //     })
        // })
    }

    const createRoomBtn = () => {
        if (isAvailbale) {
            return (<TouchableOpacity style={styles.btn} onPress={createRoomHandler}>
                <Text style={styles.btnTxt}>Create Room</Text>
            </TouchableOpacity>)
        }
    }


    useEffect(() => {
        available();
    }, [text])


    return (
        <View style={styles.conatiner}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: isAvailbale ? 'green' : 'red'
            }}>{isAvailbale ? `${text} is available` : `${text} is taken`}</Text>
            <View style={styles.btnMaster}>
                {createRoomBtn()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#363636',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center'
    },
    btnTxt: {
        textAlign: 'center',
        color: 'white'
    }
});