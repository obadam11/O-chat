import React from 'react';
import { StyleSheet, FlatList, View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Message from '../components/message';
import { sendMessageForDataBase } from '../components/data';
import firebase from 'firebase';
import { decode, encode } from 'base-64';
import { AntDesign } from '@expo/vector-icons';
import "../components/InputChat";
import ImgMessage from '../components/ImgMessage';
import { downloadAllImages, downloadOneImg } from '../components/data';
import InputChat from '../components/InputChat';


// To avoid a common warning
// import { YellowBox } from 'react-native';
// import _ from 'lodash';
// // import { FlatList } from 'react-native-gesture-handler';
// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.log = message => {
//     if (message.indexOf('Setting a timer') <= -1) {
//         _console.log(message);
//     }

// };


export default class chatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            msgs: [],
            room: ''
        }

    }


    getDataBase = () => {
        const roomName = this.getRoomName();
        firebase.firestore().collection(roomName).orderBy("sendTime").onSnapshot(docs => {
            var messages = [];
            docs.forEach(function (doc) {
                if (doc.data().type == 'txt') {
                    messages.push({
                        msg: doc.data().msg,
                        sender: doc.data().sender,
                        type: 'txt',
                        sendTime: doc.data().sendTime,
                        key: Math.random().toString()
                    });
                }
                else if (doc.data().type == 'img') {
                    messages.push({ url: doc.data().url, sender: doc.data().sender, type: 'img', key: Math.random().toString() });
                }
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
    }

    getRoomName = () => this.props.navigation.getParam('roomName');


    componentDidMount() {
        this.getDataBase();
        this.setState({ room: this.props.navigation.getParam("roomName") });
    }


    // shouldComponentUpdate() {

    // }

    render() {
        return (
            <React.Fragment>
                <StatusBar hidden />
                <View style={styles.badgeChild}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AllRooms")}>
                        <AntDesign name="arrowleft" size={24} color="black" style={styles.arr} />
                    </TouchableOpacity>
                    <Text style={styles.badgetxt}>{this.state.room}</Text>
                </View>

                <View style={styles.bgImg}>
                    <View style={styles.bgImgChild}>

                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.Os == "ios" ? "padding" : "height"}
                    >

                        {/* <View style={styles.badge}> 
                        <View style={styles.badgeChild}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("AllRooms")}>
                                <AntDesign name="arrowleft" size={24} color="black" style={styles.arr} />
                            </TouchableOpacity>
                            <Text style={styles.badgetxt}>Hello</Text>
                        </View>
                        </View> */}

                        <FlatList
                            data={this.state.msgs}
                            renderItem={({ item }) => {
                                if (item.type == 'img') {
                                    console.log(item.url);
                                    return (
                                        <ImgMessage sender={item.sender} uri={item.url} roomName={this.getRoomName()} />
                                    )
                                }
                                else {
                                    return (
                                        <Message text={item.msg} sender={item.sender} roomName={this.getRoomName()} sendTime={item.sendTime} />
                                    )
                                }
                            }
                            }
                            style={styles.msgs}
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({ animated: true });
                            }}
                        />


                        {/* <ScrollView
                            style={styles.msgs}
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({ animated: true });
                            }}
                            stickyHeaderIndices={[0]}
                        >
                            <View style={styles.badge}>
                                <View style={styles.badgeChild}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AllRooms")}>
                                        <AntDesign name="arrowleft" size={24} color="black" style={styles.arr} />
                                    </TouchableOpacity>
                                    <Text style={styles.badgetxt}>{this.state.room}</Text>
                                </View>
                            </View>
                            <View>
                                {this.state.msgs.map(item => {
                                    if (item.type == 'txt') { return <Message text={item.msg} sender={item.sender} key={Math.random()} /> }
                                    else if (item.type == 'img') { return <ImgMessage sender={item.sender} uri={item.url} key={Math.random()} roomName={this.getRoomName()} /> }
                                })}

                                {this.state.imgs.map(img => {
                                    return (
                                        <ImgMessage sender={img.sender} uri={img.url} roomName={this.getRoomName()} key={Math.random()} />
                                    )
                                })}
                            </View>
                        </ScrollView> */}
                        <View style={styles.inpConatiner}>
                            <InputChat roomName={this.getRoomName()} />
                        </View>
                    </KeyboardAvoidingView>
                </View  >
            </React.Fragment >
        )
    }
}


const styles = StyleSheet.create({
    container: {
    },
    bgImg: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: "#f0f0f0"
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
    },
    badge: {
        width: '100%',
        height: '30%',
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    badgeChild: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        // justifyContent: 'space-evenly',
        // justifyContent: "flex-start",
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    badgetxt: {
        fontSize: 20,
        marginRight: '50%',
        fontWeight: "bold",
        color: 'black'
    },
    arr: {
        marginLeft: '10%' // IF THIS IS REMOVED ARROW AND TEXT WILL STICK TO EACH OTHER
    },
});