import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { getUserEmailFromDB, userImage, uplaodProfileImg, deleteAccount, logOut, changeUserName } from '../components/data';

export default function Profile({ navigation }) {

    const [src, setSrc] = useState(require('../assets/img/profile.png'));
    // const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const imgSource = () => {
        // The (UserImage) will display the user's profile image
        userImage((image) => {
            let imgUrl = image;
            if (imgUrl != 'none') {
                console.log(imgUrl)
                setSrc({ uri: imgUrl });
            }
        })
    }
    const getEmail = () => {
        getUserEmailFromDB()
            .then(doc => {
                setEmail(doc.id);
            })
    }
    // const getuserName = () => {
    //     // The (getUserNameFromDB) will get the username of the user
    //     getUserNameFromDB(username => {
    //         setUserName(username);
    //     })
    // }
    // const getOldUserName = () => {
    //     getUserNameFromDB(username => {
    //         setoldUserName(username);
    //     })
    // }
    const changeProfileImageHandler = () => {
        // The (uplaodProfileImg) will update the profile image
        uplaodProfileImg();
    }

    useEffect(() => {
        // getuserName();
        imgSource();
        getEmail();
    }, []);

    // useEffect(() => {
    //     imgSource();
    // }, [src])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={changeProfileImageHandler}>
                <Image source={src} style={styles.img} />
            </TouchableOpacity>

            <View style={styles.emailMaster}>
                <Text style={styles.email}>{email}</Text>
            </View>

            <View style={styles.btns}>

                <TouchableOpacity style={styles.logOut} onPress={() => logOut(() => { navigation.navigate("Login") })}>
                    <Text style={styles.logOutTxt}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logOut} onPress={() => deleteAccount(() => { navigation.navigate("Login") })}>
                    <Text style={styles.logOutTxt}>Delete Account</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150,
        marginTop: 15
    },
    usernameMaster: {
        marginTop: 20,
    },
    username: {
        width: 200,
        borderBottomWidth: 1,
        borderColor: 'grey',
        marginTop: 6,
        marginBottom: 20
    },
    userNameTxt: {
        fontSize: 20
    },
    btns: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    logOut: {
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 100,
        marginVertical: 15
    },
    logOutTxt: {
        fontSize: 18,
        color: '#f0f0f0',
        fontWeight: 'bold'
    },
    emailMaster: {
        marginTop: 15
    },
    email: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});