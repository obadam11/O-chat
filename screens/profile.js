import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { getUserNameFromDB, userImage, uplaodProfileImg, deleteAccount, logOut, changeUserName } from '../components/data';

export default function Profile({ navigation }) {

    const [src, setSrc] = useState(require('../assets/img/profile.png'));
    const [userName, setUserName] = useState('');
    const [oldUserName, setoldUserName] = useState('');

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
    const getuserName = () => {
        // The (getUserNameFromDB) will get the username of the user
        getUserNameFromDB(username => {
            setUserName(username);
        })
    }
    const getOldUserName = () => {
        getUserNameFromDB(username => {
            setoldUserName(username);
        })
    }
    const changeProfileImageHandler = () => {
        // The (uplaodProfileImg) will update the profile image
        uplaodProfileImg();
    }

    useEffect(() => {
        getuserName();
        imgSource();
        getOldUserName();
    }, []);

    // useEffect(() => {
    //     imgSource();
    // }, [src])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={changeProfileImageHandler}>
                <Image source={src} style={styles.img} />
            </TouchableOpacity>

            <View style={styles.usernameMaster}>
                <Text style={styles.usernameTxt}>Username: </Text>
                <TextInput
                    style={styles.username}
                    placeholder='username'
                    placeholderTextColor="#363636"
                    onChangeText={(val) => { setUserName(val) }}
                    value={userName}
                    autoCorrect={false}
                />
            </View>

            <View style={styles.btns}>

                <TouchableOpacity style={styles.logOut} onPress={() => logOut(() => { navigation.navigate("Login") })}>
                    <Text style={styles.logOutTxt}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logOut} onPress={() => deleteAccount(() => { navigation.navigate("Login") })}>
                    <Text style={styles.logOutTxt}>Delete Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logOut} onPress={() => { changeUserName(userName, oldUserName, () => { navigation.navigate("AllRooms") }) }}>
                    <Text style={styles.logOutTxt}>Save Changes</Text>
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
    }
});