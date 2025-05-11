// import React from 'react';
import { View, Text } from 'react-native'
import HomeScreen from '../screens/home'
import {Ionicons } from '@expo/vector-icons'
import MapScreen from '../screens/mapscreen'
import EmergencyC from '../screens/emergencyScreen'
import FeedBack from '../screens/feedback'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BTST from '../screens/bottomSheetTest'
import FeatureScreen from '../screens/home/features';
import StackNavigator from './StackNavigations'
import LoginScreen from '../screens/loginScreen'


const TabNavigations = () => {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={
       { headerShown: false,
        tabBarActiveTintColor: '#71A9F7',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
            fontSize: 13,
        },
        tabBarIconStyle:{ fontSize: 18},
        tabBarStyle: {
            height: 50,
        paddingVertical: 5
        }
       }
      
    }
    >
        <Tab.Screen name="Home" component={StackNavigator}
        options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" color={color} size={size} />
            )
        }} />
        <Tab.Screen name="Map" component={MapScreen} 
        options={{
            tabBarLabel: 'Maps',
            tabBarIcon: ({color, size}) => (
                <Ionicons name="location" color={color} size={size} />
            )            
        }}/>
        <Tab.Screen name="sos" component={EmergencyC}
        options={{
            tabBarLabel:'SOS',
           tabBarIcon:({color, size}) => (<Ionicons name="shield" color={color} size={size}/>
            )
        }}/>
         <Tab.Screen name="feedback" component={FeedBack}
        options={{
            tabBarLabel:'FeedBack',
           tabBarIcon:({color, size}) => (<Ionicons name="heart-circle" color={color} size={size}/>
            ),
            tabBarActiveTintColor: '#E2235E'
            
        }}/>
        <Tab.Screen name="testScreen" component={BTST}
        options={{
            tabBarLabel:'Test',
            tabBarIcon:({color, size}) => (<Ionicons name='person-outline' color={color} size={size}/>)
        }}
        />

        {/* DC0073 - pink  D34F73, Raspberry : E2235E*/}
    </Tab.Navigator>
  )
}



export default TabNavigations

