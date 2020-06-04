import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            savedEmail: '',
            isLoading: false,
            user: ''
        }
    }
    UNSAFE_componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyDlTYCFtvZ-bohe7kjzbOLSryMshurBeEg",
            authDomain: "todo-list-68c0e.firebaseapp.com",
            databaseURL: "https://todo-list-68c0e.firebaseio.com",
            projectId: "todo-list-68c0e",
            storageBucket: "todo-list-68c0e.appspot.com",
            messagingSenderId: "306762454858",
            appId: "1:306762454858:web:dd676a64dd511e758993b3",
            measurementId: "G-8CYW4DPGK8"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
            this.props.navigation.navigate(user ? "Chat" : "Login")
            if (user) {
                console.log("You are logged in");
                this.props.navigation.navigate("Chat")
                this.setState({ savedEmail: `Logged in as ${user.email}` });
            }
            else {
                console.log("user logged out");
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
                    {console.log("Loading Now")}
                </React.Fragment>

            )
        }
        else {
            return null;
        }
    }
    availableBtns = () => {
        // let user = firebase.auth().currentUser;
        if (this.state.user) {
            return (
                <React.Fragment>
                    <View style={styles.login}>
                        <Button
                            color="#020202"
                            title="Log In"
                            onPress={this.logInHandler}
                        />
                    </View>
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
                    <View style={styles.login}>
                        <Button
                            color="#020202"
                            title="Log In"
                            onPress={this.logInHandler}
                        />
                    </View>
                    <View style={styles.signUpBtn}>
                        <Button
                            color="#020202"
                            title="Sign Up"
                            onPress={this.signUpHandler}
                        />
                    </View>
                </React.Fragment>
            )

        }
    }
    signUpHandler = () => {
        this.setState({ isLoading: true });
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ email: '', password: '', isLoading: false });
                this.props.navigation.navigate("Chat")
            })
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    logInHandler = () => {
        this.setState({ isLoading: true });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ email: '', password: '', isLoading: false });
                this.props.navigation.navigate("Chat")
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
                this.setState({ email: '', password: '', isLoading: false })
            })
            .catch(error => { alert(error); this.setState({ isLoading: false }) });
    }
    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding">
                        <Text style={styles.logtxtchild}>{this.state.savedEmail}</Text>
                    </KeyboardAvoidingView>
                    <View style={styles.inp}>
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
        backgroundColor: "#3b5998"
    },
    inp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtinp: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'white',
        width: 250,
        textAlign: 'center'
    },
    txtinp2: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'white',
        width: 250,
        textAlign: 'center',
        marginTop: 50
    },
    Btns: {
        width: 250,
        marginTop: 30,
    },
    login: {
        marginBottom: 20
    },
    signUpBtn: {
        marginBottom: 20
    },
    logOutBtn: {
        marginBottom: 20
    },
    logtxtchild: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        fontStyle: "italic",
        fontFamily: "sans-serif-light"
    }
})