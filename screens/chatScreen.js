import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Message from '../components/message';
import { sendMessageForDataBase } from '../components/data';
import firebase from 'firebase';
import { decode, encode } from 'base-64';

// To avoid a common warning
import { YellowBox } from 'react-native';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }

};


export default class chatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMsg: [],
            msgs: [],
            senderName: ''
        }

    }

    sendMessageHandler = () => {
        if (this.state.message.trim().length > 0) {
            this.setState({
                allMsg: this.state.allMsg.concat(this.state.message),
                //message: ''
            })
        }
        sendMessageForDataBase(this.getRoomName(), this.state.message,);
        this.setState({ message: '' })
    }

    getDataBase = () => {
        const roomName = this.getRoomName();
        firebase.firestore().collection(roomName).orderBy("sendTime").onSnapshot(docs => {
            var messages = [];
            docs.forEach(function (doc) {
                messages.push(doc.data().msg);
            });
            this.setState({ msgs: [...messages] });
        });
    }

    UNSAFE_componentWillMount() {
        if (!global.btoa) { global.btoa = encode }
        if (!global.atob) { global.atob = decode }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.getDataBase();
    }

    getRoomName = () => this.props.navigation.getParam('roomName');

    // getSenderName = () => {
    //     const userEmail = firebase.auth().currentUser.email;
    //     let sender;

    //     firebase.firestore().collection("users").doc(userEmail).onSnapshot(doc => {
    //         this.setState({ senderName: doc.data().name });
    //         this.setState({ senderName: doc.data().name })
    //     })
    // }

    componentDidMount() {

    }

    render() {
        return (
            <ImageBackground source={require("../assets/bg.jpg")} style={styles.bgImg}>
                <KeyboardAvoidingView
                    behavior="height"
                >
                    <ScrollView style={styles.msgs}>
                        {this.state.msgs.map(item => (<View key={Math.random()}><Message text={item} sender={this.state.senderName} key={Math.random()} /></View>))}
                    </ScrollView>
                    <View style={styles.inpConatiner}>
                        <TextInput
                            style={styles.inp}
                            onChangeText={(val) => this.setState({ message: val })}
                            value={this.state.message}
                        />
                        <TouchableOpacity style={styles.btn} onPress={this.sendMessageHandler}>
                            <MaterialIcons name="send" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    bgImg: {
        flex: 1,
        resizeMode: 'cover',
        flexDirection: 'column-reverse'
    },

    inp: {
        width: "75%",
        height: 40,
        borderWidth: 1,
        borderColor: '#90EE90',
        borderRadius: 50,
        padding: 10,
        backgroundColor: 'white'
    },
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
        backgroundColor: "lime",
        alignItems: 'center',
        justifyContent: 'center'
    },
    inpConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    msgs: {
        height: '91%',
        flexDirection: 'column',
        lineHeight: 300,
    }
});