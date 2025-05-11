import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import TabNavigations from './TabNavigations';
import SignUpScreen from '../screens/SignUpScreen';


const MainNav = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName='LoginScreen'>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            <Stack.Screen name="Tab" component={TabNavigations} options={{
                headerShown: false
            }}/>
          
            </Stack.Navigator>
    );
}

export default MainNav