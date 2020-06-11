import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { sendMessageForDataBase } from './data';
import AddImage from '../components/AddImage';

export default class InputChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
        }
    }

    getRoomName = () => this.props.roomName;


    sendMessageHandler = () => {
        if (this.state.msg.trim().length > 0) {
            sendMessageForDataBase(this.getRoomName(), this.state.msg,);
            this.setState({ msg: '' })
        }
    }

    render() {
        return (<React.Fragment>
            <AddImage roomName={this.props.roomName} />
            <TextInput
                style={styles.inp}
                onChangeText={(val) => this.setState({ msg: val })}
                value={this.state.msg}
                placeholder="Type a Message"
                multiline
            />
            <TouchableOpacity style={styles.btn} onPress={this.sendMessageHandler}>
                <MaterialIcons name="send" size={25} color="white" />
            </TouchableOpacity>
        </React.Fragment>)
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5,
        backgroundColor: "#000",
        alignItems: 'center',
        justifyContent: 'center'
    },
    inp: {
        width: "75%",
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        maxHeight: 150
    },
})