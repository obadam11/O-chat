import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createRoom, addRoomToUsers } from '../components/data';
import firebase from 'firebase';



export default class rommScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: '',
            roomName: ''
        }
    }

    createRoomHandler = () => {
        let currentUserEmail = firebase.auth().currentUser.email;
        createRoom(this.state.roomName, currentUserEmail, this.state.userEmail);
        addRoomToUsers(this.state.userEmail, this.state.roomName);
        this.props.navigation.navigate("AllRooms")
    }

    render() {
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
                        />
                        <TextInput
                            style={styles.userEmail}
                            placeholder="Enter Room's Name"
                            onChangeText={(val) => this.setState({ roomName: val })}
                            value={this.state.roomName}
                        />
                        <TouchableOpacity style={styles.btn} onPress={this.createRoomHandler}>
                            <Text style={styles.btnTxt}>Create Room</Text>
                        </TouchableOpacity>
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
    btn: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center'
    },
    btnTxt: {
        textAlign: 'center',
        color: 'white'
    }
})