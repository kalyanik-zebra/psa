import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import mapScreen from '@/assets/images/mapscreen.jpg';
import * as Location from 'expo-location'; 
import SearchBar from '@/components/Search/SearchBar';

import { SOSContext } from '@/components/Context/SendSOSContext';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const HomeScreen = () => {
  // const { sendSOS } = React.useContext(SOSContext);
  const location = {
    "accuracy": 600,
    "altitude": 520.8999633789062,
    "altitudeAccuracy": 1.0038114786148071,
    "heading": 265.0758361816406, 
    "latitude": 18.5167472, 
    "longitude": 73.9276718,
    "speed": 1.3893852233886719
  }
  const [currLocation, setCurrLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let tempCurrLocation = await Location.getCurrentPositionAsync({});
      setCurrLocation(tempCurrLocation);
      console.log(tempCurrLocation);
    })();
  }, [navigation]);  

const [isEnabled, setIsEnabled] = useState(false);

const toggleSwitch = () => {
  setIsEnabled((prev) => !prev)
  console.log(isEnabled)
  navigation.navigate('EmergencyScreen')
};

const call911 = () => {
  const url = `tel:${112}`;
      Linking.openURL(url).catch((err) => {
        Alert.alert('Error', 'Failed to make a call.');
        console.error('Error making call:', err);
    })
};

const featuresPage = () => {
  navigation.navigate('Features');
}


const safetyCheck = () => navigation.navigate('EmergencyScreen');
  return (
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle = {{flexGrow: 1}}>
        <ImageBackground source={mapScreen} resizeMode="cover" style={styles.image}>
          <View style={styles.upperDiv}>
            <Text style={styles.title}>Personal safety App</Text>

            {/* emergency sharing tab button begins */}
           <View style={styles.containerTab}>
            <TouchableOpacity style={styles.emergencySharingTab} onPress={safetyCheck}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Safety Check</Text>
                <Ionicons name="chevron-forward-outline" color={'white'} size={32} />
              </View>
            </TouchableOpacity>
              {/* call 911 */}
             <TouchableOpacity style={styles.call} onPress={call911}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Call 112</Text>
                <Ionicons name="chevron-forward-outline" color={'white'} size={32} />
              </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.exploreFeature}>
              <TouchableOpacity style={styles.exploreFeatures} onPress={featuresPage}>
                    <Text style={styles.exploreFeaturesText}>Explore Features</Text>
                    <Ionicons name="sparkles-sharp" color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
  </KeyboardAvoidingView>
  )};

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
  },
   upperDiv: {
       top: 0,
       position: 'absolute',
       height: '30%',
       width: '100%',
     borderBottomLeftRadius: 65,
       borderBottomRightRadius: 65,
       backgroundColor: 'rgba(0, 0, 150, 0.8)',

       flex: 1,
       flexDirection: 'column',
       alignItems: 'center',
      paddingTop: 100,
      paddingHorizontal: 20,
   },
   image: {
   width: '100%',
   height: '100%',
   flex: 1,
   resizeMode: 'cover',
   },
   title: {
     color: 'white',
     fontFamily: 'SpaceMono-Regular',
     fontStyle: 'italic',
     fontWeight: 'bold',
     textAlign: 'center',
     fontSize: 40,
     marginBottom: 20,
   },
   exploreFeature: {
    height: 70,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
   },
   exploreFeatures: {
    flex: 1,
    flexDirection: 'row',
     backgroundColor: 'rgba(4, 4, 61, 0.8)',
     height: '100%',
     width: '100%',
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
   },
   emergencySharingTab: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      backgroundColor: 'rgba(0, 0, 17, 0.7)',
      borderRadius: 25,
      paddingHorizontal: 10,
   },
  call: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '49%',
    borderRadius: 25,
    backgroundColor: 'rgba(255, 0, 17, 0.7)',
    paddingHorizontal: 10,
  },
   exploreFeaturesText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginRight: 10
   },
  containerTab:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '22%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  }
  });
