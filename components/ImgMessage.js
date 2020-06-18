import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { downloadAllImages } from './data';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ImgMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            me: null
        }
    }

    componentDidMount() {
        this.changeState();
    }

    changeState = () => {
        const thisUser = firebase.auth().currentUser.email;
        firebase.firestore().collection("users").doc(thisUser).onSnapshot(doc => {
            if (this.props.sender == doc.data().name) {
                this.setState({ me: true })
            }
            else {
                this.setState({ me: false });
            }
        })
    }

    rendering = () => {
        if (this.state.me) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.imgCloud}>
                        <Text style={styles.imgTxt}>{this.props.sender}</Text>
                        <Image
                            source={{ uri: this.props.uri }}
                            style={styles.tinyimg}
                        />
                        <Text style={styles.time}>{this.props.time}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.imgCloud2}>
                        <Text style={styles.imgTxt2}>{this.props.sender}</Text>
                        <Image
                            source={{ uri: this.props.uri }}
                            style={styles.tinyimg}
                        />
                        <Text style={styles.time}>{this.props.time}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.rendering()}
            </React.Fragment>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        marginRight: 10
    },
    container2: {
        alignItems: 'flex-start',
        marginLeft: 10
    },
    tinyimg: {
        width: 200,
        height: 200
    },
    imgCloud: {
        width: 250,
        height: 250,
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10
    },
    imgCloud2: {
        width: 250,
        height: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10
    },
    imgTxt: {
        color: '#fff',
        marginBottom: 10
    },
    imgTxt2: {
        color: '#000',
        marginBottom: 10
    },
    time: {
        fontSize: 10,
        color: 'gray'
    }
});