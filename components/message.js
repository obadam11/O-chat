import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase'


export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ''
        }
    }

    changeState = () => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
            if (this.props.sender == doc.data().name) {
                this.setState({ color: 'green' })
            }
            else {
                this.setState({ color: 'white' })
            }
        })
    }

    getStyle = () => {
        return (
            {
                flexDirection: "row",
                width: "70%",
                height: 80,
                padding: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: this.state.color == 'green' ? this.state.color : this.state.color,
                alignItems: 'center',
                justifyContent: 'center'
            }
        )
    }

    componentDidMount() {
        this.changeState();
    }


    render() {
        return (
            <View style={styles.container}>
                {/* Just make its styles to "styles.cloud" */}
                <View style={styles.cloud}>
                    <View style={styles.allText}>
                        <Text style={styles.test}>{this.props.text}</Text>
                        <View style={styles.senderParent}>
                            <Text style={styles.senderName}>{this.props.sender}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    test: {
        color: 'white',
        fontSize: 20
    },
    cloud: {
        flexDirection: "row",
        width: "70%",
        height: 80,
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#383838',
        alignItems: 'center',
        justifyContent: 'center'
    },
    senderParent: {
    },
    allText: {
        flexDirection: 'column'
    },
    senderName: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center'
    }
});