import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cloud}>
                    <View style={styles.cloud}>
                        <View style={styles.allText}>
                            <Text style={styles.test}>{this.props.text}</Text>
                            <View style={styles.senderParent}>
                                <Text style={styles.senderName}>{this.props.sender}</Text>
                            </View>
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
        marginBottom: 10
    },
    test: {
        color: 'red',
        fontSize: 20
    },
    cloud: {
        flexDirection: "row",
        width: 150,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'green',
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
    }
});