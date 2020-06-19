import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import firebase from 'firebase';
import { addUser, deleteUser } from '../components/data';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            savedEmail: '',
            isLoading: false,
            user: '',
            name: '',
        }
    }
    // UNSAFE_componentWillMount() {
    //     const firebaseConfig = {
    //         apiKey: "AIzaSyDlTYCFtvZ-bohe7kjzbOLSryMshurBeEg",
    //         authDomain: "todo-list-68c0e.firebaseapp.com",
    //         databaseURL: "https://todo-list-68c0e.firebaseio.com",
    //         projectId: "todo-list-68c0e",
    //         storageBucket: "todo-list-68c0e.appspot.com",
    //         messagingSenderId: "306762454858",
    //         appId: "1:306762454858:web:dd676a64dd511e758993b3",
    //         measurementId: "G-8CYW4DPGK8"
    //     };

    //     if (!firebase.apps.length) {
    //         firebase.initializeApp(firebaseConfig);
    //     }

    // }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
            // BEWARE of this
            // this.props.navigation.navigate(user ? "AllRooms" : "Login")
            if (user) {
                // BEWARE OF THIS
                // this.props.navigation.navigate("AllRooms")
                this.props.navigation.replace('AllRooms');
                this.setState({ savedEmail: `Logged in as ${user.email}` });
            }
            else {
                this.props.navigation.navigate("Login");
                this.setState({ savedEmail: "Not logged in yet" })
            }
        })
    }
    showLoading = () => {
        if (this.state.isLoading) {
            return (
                <React.Fragment>
                    <ActivityIndicator size="large" color="red" />
                </React.Fragment>

            )
        }
        else {
            return (
                <React.Fragment>

                </React.Fragment>
            )
        }
    }
    navigateToRoomsScreen = () => {
        if (this.state.user)
            this.props.navigation.navigate("AllRooms");
        else
            alert("You should Log in first!")
    }
    TextInputs = () => {
        if (!this.state.user) {
            return (
                <React.Fragment>
                    <TextInput
                        style={styles.txtinp}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        onChangeText={(val) => this.setState({ email: val })}
                        value={this.state.email}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.txtinp2}
                        placeholder="password"
                        placeholderTextColor="gray"
                        onChangeText={(val) => this.setState({ password: val })}
                        value={this.state.password}
                        secureTextEntry
                        textContentType="password"
                    />
                    <TextInput
                        style={styles.txtinp3}
                        placeholder="user name"
                        placeholderTextColor="gray"
                        onChangeText={(val) => this.setState({ name: val })}
                        value={this.state.name}
                        autoCompleteType="name"
                    />
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                </React.Fragment>
            )
        }
    }
    availableBtns = () => {
        if (this.state.user) {
            return (
                <React.Fragment>
                    <View style={styles.logOutBtn}>
                        <Button
                            color="#020202"
                            title="Log Out"
                            onPress={this.signOutHandler}
                        />
                    </View>
                    <Button
                        color="#020202"
                        title="Delete account"
                        onPress={this.deleteAccountHandler}
                    />
                </React.Fragment>
            )
        } else {

            return (
                <React.Fragment>
                    {/* <View style={styles.login}>
                        <Button
                            color="#020202"
                            title="Log In"
                            onPress={this.logInHandler}
                        />
                    </View> */}

                    <View style={styles.signUpBtn}>
                        <Button
                            color="#020202"
                            title="Sign Up"
                            onPress={this.signUpHandler}
                        />
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTxt}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={this.logInHandler}><Text style={styles.loginWord}>  Log in</Text></TouchableOpacity>
                    </View>
                </React.Fragment>
            )

        }
    }
    signUpHandler = () => {
        this.setState({ isLoading: true });
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                let user = firebase.auth().currentUser;
                addUser(this.state.email, user.uid, this.state.name);
                this.props.navigation.navigate("AllRooms")
                this.setState({ email: '', password: '', isLoading: false });

            })
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    logInHandler = () => {
        this.setState({ isLoading: true });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ email: '', password: '', isLoading: false });
                this.props.navigation.navigate("AllRooms")
            }
            )
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    signOutHandler = () => {
        this.setState({ isLoading: true });
        firebase.auth().signOut()
            .then(() => {
                this.setState({ email: '', password: '', isLoading: false });
                this.props.navigation.navigate("Login");
            })
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    deleteAccountHandler = () => {
        this.setState({ isLoading: true });
        let thisUser = firebase.auth().currentUser;
        thisUser.delete()
            .then(() => {
                alert("Account Deleted");
                deleteUser(thisUser.email);
                this.setState({ email: '', password: '', isLoading: false })
            })
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.logtxtchild}>{this.state.savedEmail}</Text>
                        <TouchableOpacity onPress={this.navigateToRoomsScreen}>
                            <AntDesign name="arrowright" size={24} color="black" style={{ marginTop: 10, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inp}>
                        {this.TextInputs()}

                        <View style={styles.Btns}>
                            {this.availableBtns()}
                        </View>
                    </View>
                </View>
                <View style={{ position: 'absolute', left: "50%", height: "50%", marginTop: 300 }}>
                    {this.showLoading()}
                </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    inp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtinp: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'black',
        width: 250,
        textAlign: 'center'
    },
    txtinp2: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'black',
        width: 250,
        textAlign: 'center',
        marginTop: 50
    },
    txtinp3: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'black',
        width: 250,
        textAlign: 'center',
        marginTop: 50
    },
    Btns: {
        width: 250,
        marginTop: 30,
    },
    signUpBtn: {
        marginBottom: 20
    },
    logOutBtn: {
        marginBottom: 20
    },
    logtxtchild: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: "bold",
        fontFamily: "sans-serif-light"
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    loginWord: {
        fontWeight: 'bold',
        color: "#383838"
    }
})