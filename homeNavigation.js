import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Chat from './screens/chatScreen';
import Login from './screens/Login';
import firebase from 'firebase';



const screens = {
    Login: {
        screen: Login
    },
    Chat: {
        screen: Chat
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);