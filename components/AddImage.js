import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    // selectPicture = async () => {
    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     const { cancled, uri } = await ImagePicker.launchImageLibraryAsync({
    //         aspect: 1,
    //         allowsEditing: true
    //     })
    //     if (!cancled) this.setState({ image: uri });
    // }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image source={{ uri: this.state.image }} /> */}
                <TouchableOpacity>
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
})