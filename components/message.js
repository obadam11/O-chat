import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase'


export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: undefined
        }
    }

    changeState = () => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
            if (doc.data().name == this.props.sender) {
                this.setState({ me: 'true' })
            }
            else if (this.props.sender == 'bot') {
                this.setState({ me: 'none' })

            }
            else {
                this.setState({ me: 'false' })
            }
        })
    }
    condition = () => {
        if (this.state.me == 'true') {
            return (
                <View style={styles.container}>
                    <View style={styles.cloud}>
                        <View style={styles.allText}>
                            <Text style={styles.senderName}>{this.props.sender}</Text>
                            <Text style={styles.test}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else if (this.state.me == 'none') {
            return (
                <View style={styles.container3}>
                    <View style={styles.cloud3}>
                        <View style={styles.allText}>
                            <Text style={styles.senderName}>{this.props.sender}</Text>
                            <Text style={styles.test}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>
            )

        }
        else {
            return (
                <View style={styles.container2}>
                    <View style={styles.cloud2}>
                        <View style={styles.allText}>
                            <Text style={styles.senderName2}>{this.props.sender}</Text>
                            <Text style={styles.test2}>{this.props.text}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    componentDidMount() {
        this.changeState();
    }

    // shouldComponentUpdate() {
    //     // return false;
    // }


    render() {
        return (
            this.condition()
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'flex-end',
        marginRight: 10
    },
    container2: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    container3: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    test: {
        color: 'white',
        fontSize: 20,
    },
    test2: {
        color: 'black',
        fontSize: 20,
    },
    cloud: {
        flexDirection: "row",
        maxWidth: 325,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#383838',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cloud2: {
        flexDirection: "row",
        maxWidth: 325,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cloud3: {
        flexDirection: "row",
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'rgba(	135, 206, 235, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    allText: {
        flexDirection: 'column',
    },
    senderName: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    senderName2: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center'
    }
});