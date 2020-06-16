import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import Profile from '../screens/profile';

export default class PassingProps extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Profile navigation={this.props.naviagtion} />
        )
    }
}