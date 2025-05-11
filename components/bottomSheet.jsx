import { Alert, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { IP } from '@/data/dbconfig';
import React, { useEffect, useState } from 'react';
import RadialProgressBar from './radialProgressBar';
import { Ionicons } from '@expo/vector-icons';

const SheetBody = ({ place }) => {
  const [locationDetails, setLocationDetails] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const res = await axios.get(`http://${IP}:4000/getSafetyInfo`, {
          params: { location_name: place },
        });
        setLocationDetails(res.data);
        console.log("location_ details: ", res.data);
      } catch (error) {
        console.error('Error fetching safety details:', error.response || error.message);
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Unable to fetch safety details. Please try again later.'
        );
      }
    };

    fetchLocationDetails();
  }, [place]); 


  return (
  <View>
    {locationDetails ? (
       <View style={styles.container}>
      
       <View style={styles.info}>
       
          <View style={styles.left}>
              <View style={styles.labels}>
                <Ionicons name="location" color={'blue'} size={17} style={{ marginRight: 5}}/>
                <Text style={styles.title}>{locationDetails.location_name}</Text>
              </View>

              <View style={styles.labels}>
                <Ionicons name="location" color={'blue'} size={17} style={{ marginRight: 5}}/> 
                <Text style={styles.text}>{locationDetails.addresstype}</Text>
              </View>
              <View style={styles.labels}>
                <Ionicons name="location" color={'blue'} size={17} style={{ marginRight: 5}}/>
                <Text style={styles.text}>{locationDetails.display_name}</Text>
              </View>
          </View>
          <View style={styles.right}>
            <RadialProgressBar level = { locationDetails.safety_percent }  />
          </View>
          
       </View>
    </View>
    ): 
   (
      <Text>Loading...</Text>
   )}
  </View>
  );
};

export default SheetBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  
  labels:{
    height: 50,
    flexDirection: 'row',
    font: 19,
    color: '#222831',
    fontWeight: 'bold',
    padding: 0,
    width: '100%'
  },
  title: {
    font: 25,
    color: '#27445D',
    fontWeight: 'bold'
  },
  info: {
    flex: 0,
    flexDirection: 'row',
    // borderColor: 'black',
    // borderWidth: 1,
    borderRadius: 10,
    height: 180,
    width: '98%',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingVertical: 17,
    elevation: 2,
    shadowColor: 'grey',
    
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
},
  left: {
    width: '67%',
  },
  
  text: {
    font: 12,
    color: '#27445D',
    fontWeight: 'semibold'  
  }
})
