import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RoomView from '../components/roomView';
import firebase from 'firebase';
import 'firebase/firestore'

export default class AllRooms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
        }
    }

    NavigateToroomScreen = () => {
        this.props.navigation.navigate("roomScreen");
    }
    NavigateToChatScreen = roomName => {
        this.props.navigation.navigate("Chat", { roomName, });
    }


    userWithNoRooms = () => {
        if (this.state.rooms.length == 0) {
            return (
                <View style={styles.noRooms}>
                    <Text style={styles.noRoomsTxt}>You have no rooms 😢</Text>
                </View>
            )
        }
    }




    UNSAFE_componentWillMount() {
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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    componentDidMount() {
        // const userRooms = () => {
        //     const userEmail = firebase.auth().currentUser.email;
        //     firebase.firestore().collection("users").doc(userEmail).get()
        //         .then(doc => {
        //             this.setState({ rooms: [...doc.data().rooms] })
        //         })
        //         .catch(err => alert(err));
        // }

        const userRooms = () => {
            const userEmail = firebase.auth().currentUser.email;
            firebase.firestore().collection("users").doc(userEmail).onSnapshot(doc => {
                this.setState({ rooms: [...doc.data().rooms] })
            })
        }
        userRooms();

    }



    render() {
        return (
            <React.Fragment>
                <TouchableOpacity style={styles.container} onPress={this.NavigateToroomScreen}>
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>

                {this.userWithNoRooms()}

                <ScrollView style={styles.rooms}>
                    {this.state.rooms.map(room => {
                        return (
                            <TouchableOpacity onPress={() => this.NavigateToChatScreen(room)} key={room}>
                                <RoomView name={room} key={room} />
                            </TouchableOpacity>
                        )

                    })}

                </ScrollView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    rooms: {
        width: '100%',
        height: "80%",
        lineHeight: 300,
        flexDirection: 'column',
        marginTop: 35,
        marginBottom: 10
    },
    noRoomsTxt: {
        color: 'grey',
        fontSize: 17
    },
    noRooms: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});