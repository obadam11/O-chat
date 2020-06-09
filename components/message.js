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
            if (this.props.sender == doc.data().name) {
                this.setState({ me: true })
            }
            else {
                this.setState({ me: false });
            }
        })
    }
    condition = () => {
        if (this.state.me) {
            return (
                <View style={styles.container}>
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
        else {
            return (
                <View style={styles.container2}>
                    <View style={styles.cloud2}>
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

    componentDidMount() {
        this.changeState();
    }


    render() {
        return (
            this.condition()
            // <View style={styles.conatiner}>
            //     {/* Just make its styles to "styles.cloud" */}
            //     <View style={styles.cloud}>
            //         <View style={styles.allText}>
            //             <Text style={styles.test}>{this.props.text}</Text>
            //             <View style={styles.senderParent}>
            //                 <Text style={styles.senderName}>{this.props.sender}</Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    container2: {
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
        alignSelf: 'flex-end',
        marginRight: 10
    },
    test: {
        color: 'white',
        fontSize: 20,
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
        justifyContent: 'center',
    },
    cloud2: {
        flexDirection: "row",
        width: "70%",
        height: 80,
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center'
    },
    senderParent: {
    },
    allText: {
        flexDirection: 'column',
    },
    senderName: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center'
    }
});