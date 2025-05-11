import { createStackNavigator } from '@react-navigation/stack';
import FeatureScreen from '../screens/home/features';
import SafetyCheck from '../screens/home/emergencySharing';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/bottomSheetTest';


const StackNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen name = "HomeComp" component={HomeScreen}/>
            <Stack.Screen name="Features" component={FeatureScreen} />
            <Stack.Screen name="EmergencyScreen" component={SafetyCheck} />
            
            </Stack.Navigator>
    );
}

export default StackNavigator