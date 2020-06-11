import React from 'react';
import { View, Keyboard, StyleSheet, TouchableOpacity, Alert, CameraRoll } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { uploadImage } from './data';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';

export default class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            extrabtns: false
        }
    }

    componentDidMount() {
        firebase.app();
        const permission = async () => {
            if (Constants.platform.android || Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        }
        permission();
    }

    renderButtons = () => {
        if (this.state.extrabtns) {
            Keyboard.dismiss();
            return (
                <View style={styles.btnsMaster}>
                    <TouchableOpacity onPress={this.selectPicture}>
                        <Entypo name="image" size={24} color="black" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={this.takePicture}>
                        <Entypo name="camera" size={24} color="black" style={{ marginVertical: 20 }} />
                    </TouchableOpacity>

                </View>
            )

        }
    }

    selectPicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            // uploadImage(result.uri, this.props.roomName)
            //     .then(() => {
            //         // CameraRoll.saveImageWithTag(result.uri);
            //         Alert.alert("Uploaded successfully")
            //     })
            //     .catch(err => Alert.alert(err));

            firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).onSnapshot(doc => {
                firebase.firestore().collection(this.props.roomName).doc().set({
                    type: 'img',
                    url: result.uri,
                    sender: doc.data().name,
                    sendTime: firebase.firestore.FieldValue.serverTimestamp()
                })
                    .then(async () => {
                        const response = await fetch(result.uri);
                        const blob = await response.blob();

                        let refernce = firebase.storage().ref().child(`${this.props.roomName}/${Math.random()}`);
                        console.log('finished uploading');
                        refernce.put(blob)
                            .then(() => {
                                // CameraRoll.saveImageWithTag(result.uri);
                                Alert.alert("Uploaded successfully")
                            })
                            .catch(err => Alert.alert(err));

                    })
                    .catch(err => Alert.alert(err));
            })
        }
    }

    takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })
        if (!result.cancelled) {
            this.setState({ image: result.uri })
            uploadImage(result.uri, this.props.roomName)
                .then(() => { Alert.alert("Uploaded successfully") })
                .catch(err => Alert.alert(err))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image source={{ uri: this.state.image }} style={styles.img} /> */}
                {this.renderButtons()}
                <TouchableOpacity onPress={() => this.setState({ extrabtns: this.state.extrabtns ? false : true })}>
                    <AntDesign name="paperclip" size={24} color="black" style={styles.clip} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    clip: {
        marginRight: 10
    },
    img: {
        width: 50,
        height: 50
    },
    btnsMaster: {

    }
})