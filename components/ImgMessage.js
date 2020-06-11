import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { downloadAllImages } from './data';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ImgMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: []
        }
    }

    componentDidMount() {
        // const getImg = () => {
        //     let img = firebase.storage().ref(`${this.props.roomName}/second`);
        //     img.getDownloadURL().then(url => {
        //         console.log(url);
        //         this.setState({ img: url })
        //     })
        //         .catch(err => alert(err));

        // }
        // getImg();

        // firebase.storage().ref(this.props.roomName).listAll().then(snap => {
        //     snap.items.forEach(itemRef => {
        //         itemRef.getDownloadURL().then(imgUrl => {
        //             this.setState({ imgs: this.state.imgs.concat(imgUrl) });
        //         })
        //     })
        // })
        downloadAllImages(this.props.roomName, (imgUrl) => {
            this.setState({ imgs: this.state.imgs.concat(imgUrl) });
        })
    }

    rendering = () => {
        const thisUser = firebase.auth().currentUser.email;
        firebase.firestore().collection("users").doc(thisUser).onSnapshot(doc => {
            let thisUserName = doc.data().name;

            if (this.props.sender == thisUserName) {
                console.log(thisUserName);
                return (<TouchableOpacity style={styles.imgCloud}>
                    <Text style={styles.imgTxt}>{this.props.sender}</Text>
                    <Image
                        source={{ uri: this.props.uri }}
                        style={styles.tinyimg}
                    />
                </TouchableOpacity>)
            }
            else {
                return (<TouchableOpacity style={styles.imgCloud}>
                    <Text style={styles.imgTxt}>{this.props.sender}</Text>
                    <Image
                        source={{ uri: this.props.uri }}
                        style={styles.tinyimg}
                    />
                </TouchableOpacity>)
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>

                {/* {this.rendering()} */}
                <TouchableOpacity style={styles.imgCloud}>
                    <Text style={styles.imgTxt}>{this.props.sender}</Text>
                    <Image
                        source={{ uri: this.props.uri }}
                        style={styles.tinyimg}
                    />
                </TouchableOpacity>

                {/* {this.state.imgs.map(img => {

                    return (
                        <TouchableOpacity style={styles.imgCloud} key={img}>
                            <Text style={styles.imgTxt}>{this.props.sender}</Text>
                            <Image
                                // source={{ uri: img }}
                                source={{ uri: this.props.uri }}
                                style={styles.tinyimg}
                                key={img}
                            />
                        </TouchableOpacity>

                    )

                })} */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tinyimg: {
        width: 100,
        height: 100
    },
    imgCloud: {
        width: 140,
        height: 140,
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10
    },
    imgTxt: {
        color: '#fff'
    }
});