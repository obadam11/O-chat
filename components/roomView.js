import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default class RoomView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.roomName}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: "100%",
        paddingVertical: 20,
        // backgroundColor: 'skyblue',
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        // borderRadius: 30
    },
    roomName: {
        fontSize: 20,
        textAlign: 'center'
    }
});