import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import axios from 'axios';
import { IP } from '@/data/dbconfig'

export const SOSContext = createContext();

export const SOSProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch current location when the app starts
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  // Define the sendSOS method
  const sendSOS = async () => {
    console.log('Sending SOS...');
    // console.log('Current Location:', currentLocation);
    if (!currentLocation) {
      Alert.alert('Error', 'No current location captured.');
      return;
    }
    const emergencyContacts = (await axios.get(`http://${IP}:4000/contacts`)).data;
    console.log('Emergency Contacts:', emergencyContacts);
    const phoneNumbers = emergencyContacts.map(contact => contact.phone).join(',');
    console.log('Phone Numbers:', phoneNumbers);

    try {
      const { latitude, longitude } = currentLocation;
      console.log('Latitude:', latitude, 'Longitude:', longitude);

      const message = `SOS! I need help. My current location is: https://www.google.com/maps?q=${latitude},${longitude}`;

      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'SMS is not available on this device.');
        return;
      }
      console.log('Sending message:', emergencyContacts);
      const { result } = await SMS.sendSMSAsync([phoneNumbers], message);
      console.log({result});
      if (result === 'unknown') {
        Alert.alert('SOS Sent', 'Emergency messages have been sent.');
      } else {
        Alert.alert('Error', 'Failed to send SOS message.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the SOS message.');
      console.error("failure: ",error);
    }
  };

  return (
    <SOSContext.Provider value={{ currentLocation, sendSOS }}>
      {children}
    </SOSContext.Provider>
  );
};