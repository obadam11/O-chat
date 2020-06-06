import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Chat from './screens/chatScreen';
import Login from './screens/Login';
import roomScreen from './screens/roomScreen';
import AllRooms from './screens/allRooms';



const screens = {
    Login: {
        screen: Login
    },
    AllRooms: {
        screen: AllRooms
    },
    roomScreen: {
        screen: roomScreen
    },
    Chat: {
        screen: Chat
    }
}
const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);