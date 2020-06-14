import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createRoom, addRoomToUsers } from '../components/data';
import RoomNameText from '../components/roomNameText';
import firebase from 'firebase';
import 'firebase/firestore';


export default class rommScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            roomName: '',
        }
    }

    // createRoomHandler = () => {
    //     const createRoom = () => {
    //         let currentUserEmail = firebase.auth().currentUser.email;
    //         createRoom(this.state.roomName, currentUserEmail, this.state.userEmail);
    //         addRoomToUsers(this.state.userEmail, this.state.roomName);
    //         this.props.navigation.navigate("AllRooms");
    //     }

    //     firebase.firestore().collection('users').get().then(docs => {
    //         docs.forEach(doc => {
    //             if (doc.id == this.state.userEmail) {
    //                 createRoom()
    //             }
    //             else {
    //                 Alert.alert("Sorry!", "This user email doesn't exists!")
    //             }
    //         })
    //     })
    // }

    // available = () => {
    //     console.log('heer');
    //     firebase.firestore().collection("rooms").get().then(docs => {
    //         docs.forEach(doc => {
    //             if (this.state.roomName == doc.data().name || this.state.roomName == 'rooms' || this.state.roomName == 'users' || this.state.roomName == '') {
    //                 this.setState({ taken: true });
    //             }
    //             else {
    //                 this.setState({ taken: false });
    //             }
    //         })
    //     })
    // }


    // createRoomBtn = () => {
    //     if (!this.state.taken) {
    //         return (<TouchableOpacity style={styles.btn} onPress={this.createRoomHandler}>
    //             <Text style={styles.btnTxt}>Create Room</Text>
    //         </TouchableOpacity>)
    //     }
    // }


    render() {
        // this.available();
        return (
            <React.Fragment><View style={styles.top}>
                <Text style={styles.toptxt}>Add a User to a Room </Text>
            </View>
                <View style={styles.conatiner}>

                    <View style={styles.userEmailMaster}>
                        <TextInput
                            style={styles.userEmail}
                            placeholder="Enter User's Email"
                            onChangeText={(val) => this.setState({ userEmail: val })}
                            value={this.state.userEmail}
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.userEmail}
                            placeholder="Enter Room's Name"
                            onChangeText={(val) => this.setState({ roomName: val })}
                            value={this.state.roomName}
                        />
                        <RoomNameText text={this.state.roomName} email={this.state.userEmail} navigation={this.props.navigation} />
                        {/* <View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: !this.state.taken ? 'green' : 'red'
                            }}>
                                {(!this.state.taken) ? `${this.state.roomName} is available` : `${this.state.roomName} is taken`}
                            </Text>
                        </View> */}

                        {/* {this.createRoomBtn()} */}
                    </View>
                </View >
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    top: {
        alignItems: 'center'
    },
    toptxt: {
        fontSize: 20,
        fontFamily: "sans-serif-light",
        marginTop: 10
    },
    userEmailMaster: {
        alignItems: 'center',
    },
    userEmail: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 30,
        width: '75%',
        textAlign: "center"
    },
    // btn: {
    //     width: 80,
    //     height: 80,
    //     borderRadius: 40,
    //     backgroundColor: '#363636',
    //     justifyContent: 'center',
    //     marginTop: 20,
    //     alignItems: 'center'
    // },
    // btnTxt: {
    //     textAlign: 'center',
    //     color: 'white'
    // }
})