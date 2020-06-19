import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default function Loading({ navigation }) {

    useEffect(() => {
        // console.log(firebase.auth().currentUser);
        // if (firebase.auth().currentUser != null) {
        //     navigation.navigate("Login")
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //navigation.navigate("Login");
                navigation.replace("Login");
            }
            else {

            }
        })
    }, []);
    return (
        <View style={styles.container}>

            <View style={styles.logoMaster}>
                <Image source={require("../assets/img/logo.png")} style={styles.logo} />
            </View>

            <ActivityIndicator size='large' color='#363636' style={styles.loading} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    logo: {
        width: 200,
        height: 200
    },
    logoMaster: {
        alignItems: 'center'
    },
    loading: {
        marginTop: 90
    }
})