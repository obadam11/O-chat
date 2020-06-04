import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Message from '../components/message';
// import Database from './database';


export default class chatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMsg: []
        }
    }

    sendMessageHandler = () => {
        if (this.state.message.trim().length > 0) {
            console.log(this.state.message);
            this.setState({
                allMsg: this.state.allMsg.concat(this.state.message),
                message: ''
            })
        }
        console.log(this.state.allMsg);
    }


    render() {
        return (
            <ImageBackground source={require("../assets/bg.jpg")} style={styles.bgImg}>
                <KeyboardAvoidingView
                    behavior="height"
                >
                    <ScrollView style={styles.msgs}>
                        <Message text="Helllo" sender="Obada" />
                        <Message text="Welcome" sender="Obada" />
                        <Message text="Obada" sender="Obada" />
                        <Message text="Obada" sender="Obada" />
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
        // backgroundColor: 'white'
    },
    msgs: {
        height: '91%',
        flexDirection: 'column',
        lineHeight: 300,
    }
});