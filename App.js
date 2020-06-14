import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import Login from './screens/Login';
import Chat from "./screens/chatScreen";
import Navigator from './homeNavigation';
import AllRooms from './screens/allRooms';

console.disableYellowBox = true

export default function App() {
  return (
    <React.Fragment>
      {/* <Login /> */}
      {/* <Chat /> */}
      <Navigator />
      {/* <AllRooms /> */}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
