import React, { useState } from 'react';
import { IP } from '@/data/dbconfig'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomDropdown from '@/components/customDropdown';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const FeedBack = () => {
  const [safetyLevel, setSafetyLevel] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const getLatLon = async (address) => {
    if (!address || typeof address !== 'string' || address.trim() === '') {
      console.error('Invalid address provided');
      return { lat: null, lon: null };
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    console.log(url);
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'psa/1.0 koltep.kalyani@gmail.com)', 
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const location = data[0];
          // console.log('Location data:', location);
          return { name: location.name, addresstype: location.addresstype, lat: parseFloat(location.lat), lon: parseFloat(location.lon), info: location.display_name };
        } else {
          console.log(`No data found for address: ${address}`);
          return { name: null, lat: null, lon: null, info: null };
        }
      } else {
        console.error(`Failed to fetch data for address: ${address}`);
        console.error(`Response status: ${response.status}`);

        return { name: null, lat: null, lon: null, info: null };
      }
    } catch (error) {
      console.error(`Error fetching data for address: ${address}`, error);
      return { name: null, lat: null, lon: null, info: null };
    }
  };

  const handleSubmit = async () => {
    if (location === '' || experience === '' || safetyLevel === '') {
      console.log('Please fill all fields');
      return;
    }

    
    try {
      const { name, addresstype, lat, lon, info } = await getLatLon(location);
    console.log('Latitude:', lat, 'Longitude:', lon);
    const id = (await axios.get(`http://${IP}:4000/getidCount`)).data;
    const newFeedback = {
      id: id,
      location_name: name,
      addresstype: addresstype,
      lat: lat,
      lon: lon,
      experience: experience,
      safety_level: safetyLevel,
      info: info
    };
    // console.log('New feedback object:', newFeedback);
      const res = await axios.post(
        `http://${IP}:4000/feedback`,
        newFeedback
      );
      // console.log('Response from server: ', res.data, res.status);
      setShowThankYou(true);

      setLocation('');
      setExperience('');
      setSafetyLevel('');

  
      setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <View style={{margin: 0, padding: 0, flex: 1}}>
      {showThankYou ? (
        // Full-screen "Thank You" animation
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          style={styles.thankYouContainer}
        >
          <Text style={styles.thankYouText}>Thank you for your contribution!</Text>
        </Animatable.View>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flex: true,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.title}>Feedback</Text>
              <Ionicons
                style={{ alignSelf: 'center', marginTop: 10, marginLeft: 8 }}
                name="thumbs-up"
                color={'#333340'}
                size={35}
              />
            </View>
            <View style={styles.containerInner}>
              <View style={styles.inputContainer}>
                <Text style={styles.textOverInput}>Location you visited</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Location name"
                  value={location}
                  onChangeText={(value) => setLocation(value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textOverInput}>How was your experience</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your experience"
                  value={experience}
                  onChangeText={(value) => setExperience(value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.textOverInput}>Safety Level</Text>
                <CustomDropdown
                  placeholder={'How would you mark this place...'}
                  options={[
                    { label: 'Highly Unsafe', value: 1, color: '#FD151B' },
                    { label: 'Unsafe at night', value: 2, color: '#EC7505' },
                    { label: 'Mostly Safe', value: 3, color: '#FFC53A' },
                    { label: 'Safe', value: 4, color: '#21A179' },
                  ]}
                  selectedValue={safetyLevel}
                  onValueChange={(value) => setSafetyLevel(value)}
                />
              </View>

              <TouchableOpacity style={styles.formSubmit} onPress={handleSubmit}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={require('@/assets/images/psalogo.png')}
              style={styles.logo}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    overflow: 'scroll',
    paddingHorizontal: 18,
    paddingVertical: 18,
    textAlign: 'center',
  },
  containerInner: {
    flex: 0.2,
    top: 0,
    borderColor: '#333340',
    borderWidth: 0.95,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333340',
    marginBottom: '5%',
    marginTop: '8%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15
  },
  input: {
    height: 60,
    borderColor: '#494666',
    backgroundColor: 'white',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textOverInput: {
    height: 20,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 8,
    color: '#333340',
    margin: 1,
  },
  formSubmit: {
    height: 60,
    borderColor: '#494666',
    backgroundColor: 'blue',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    height: 250,
    width: 390,
    position: 'relative',
    alignSelf: 'center',
  },
  thankYouContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E4749',
    zIndex: 10,
  },
  thankYouText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});