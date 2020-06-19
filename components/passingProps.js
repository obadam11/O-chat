import React, { Component } from 'react';
import { View } from 'react-native';
import Profile from '../screens/profile';
import Loading from '../screens/Loading';

export default class PassingProps extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Profile navigation={this.props.naviagtion} />
                <Loading naviagtion={this.props.naviagtion} />
            </View>
        )
    }
}