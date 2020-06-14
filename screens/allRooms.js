import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RoomView from '../components/roomView';
import { deleteRoomUsers, deleteRoomColl } from '../components/data'
import firebase from 'firebase';
import 'firebase/firestore'

export default class AllRooms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            // roomsWithFriends: []
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
                    <Text style={styles.noRoomsTxt2}>To add rooms click the add button at the bottom right</Text>
                </View>
            )
        }
    }

    deleteRoom = (roomName) => {
        const sure = () => {
            deleteRoomColl(roomName);
            deleteRoomUsers(roomName);
        }

        Alert.alert("Delete?", "Are you sure you want to delete this room?", [
            { text: "Cancel" },
            { text: 'Yes', onPress: sure }
        ])
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
        const userRooms = () => {
            const userEmail = firebase.auth().currentUser.email;
            firebase.firestore().collection("users").doc(userEmail).onSnapshot(doc => {
                this.setState({ rooms: [...doc.data().rooms] })
            })
        }

        // const userRooms = () => {
        //     firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
        //         this.setState({ rooms: [...doc.data().rooms] })

        //         this.state.rooms.forEach(room => {
        //             console.log(room);
        //             const userEmail = firebase.auth().currentUser.email;
        //             firebase.firestore().collection(room).doc("fstmsg").get().then(doc2Users => {
        //                 const user1 = doc2Users.data().user1Email;
        //                 const user2 = doc2Users.data().user2email;
        //                 let friendEmail = (user1 != userEmail) ? user1 : user2;
        //                 firebase.firestore().collection("users").doc(friendEmail).get().then(doc => {
        //                     console.log(doc.data().name);
        //                     this.setState({ roomsWithFriends: this.state.roomsWithFriends.concat({ name: room, friend: doc.data().name }) })
        //                     console.log(this.state.roomsWithFriends);
        //                 })
        //             })

        //         })
        //     })
        // }


        userRooms();
    }

    // displayRoom = () => {
    //     if (this.state.roomsWithFriends.length) {
    //         console.log(this.state.roomsWithFriends);
    //         return (
    //             this.state.roomsWithFriends.map(part => {
    //                 return (
    //                     <TouchableOpacity
    //                         onPress={() => this.NavigateToChatScreen(part.name)}
    //                         key={part.name}
    //                         onLongPress={() => this.deleteRoom(part.name)}
    //                         delayLongPress={600}
    //                     >
    //                         <RoomView name={part.name} key={part.name} friend={part.friend} />
    //                     </TouchableOpacity>
    //                 )
    //             })
    //         )

    //     }
    //     else {
    //         return (
    //             <React.Fragment></React.Fragment>
    //         )
    //     }
    // }



    render() {
        return (
            <React.Fragment>
                {/* <TouchableOpacity style={styles.container} onPress={this.NavigateToroomScreen}>
                    <View style={styles.plus}>
                        <AntDesign name="plus" size={24} color="#f0f0f0" />
                    </View>
                </TouchableOpacity> */}

                {this.userWithNoRooms()}

                <ScrollView style={styles.rooms}>
                    {this.state.rooms.map(room => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.NavigateToChatScreen(room)}
                                key={room}
                                onLongPress={() => this.deleteRoom(room)}
                                delayLongPress={600}
                            >
                                <RoomView name={room} key={room} />
                            </TouchableOpacity>
                        )
                    })}

                    {/* {this.displayRoom()} */}

                </ScrollView>
                <TouchableOpacity style={styles.container} onPress={this.NavigateToroomScreen}>
                    <View style={styles.plus}>
                        <AntDesign name="plus" size={24} color="#f0f0f0" />
                    </View>
                </TouchableOpacity>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        position: 'absolute',
        right: 10,
        bottom: 15,
    },
    rooms: {
        width: '100%',
        height: "80%",
        lineHeight: 300,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 70,
    },
    noRoomsTxt: {
        color: 'grey',
        fontSize: 25,
        marginBottom: 20
    },
    noRoomsTxt2: {
        color: 'grey',
        fontSize: 16
    },
    noRooms: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bar: {
    },
    plus: {
        backgroundColor: '#363636',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
});