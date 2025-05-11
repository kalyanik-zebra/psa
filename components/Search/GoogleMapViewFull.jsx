import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const GoogleMapViewFull = ({ mapRegion, circleColor, onJumpToCurrentLocation, onShowNavigation }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        provider="google"
      >
        {/* Marker for the selected location */}
        <Marker
          coordinate={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          title="Selected Location"
        />

        {/* Circle to represent the region */}
        <Circle
          center={{
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
          }}
          radius={1000}
          strokeColor={circleColor.stroke}
          fillColor={circleColor.fill} 
        />
      </MapView>

      {/* Button to jump back to the current location */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={onJumpToCurrentLocation}
      >
       <Ionicons
        style={{ alignSelf: 'center', margin: 2 }}
        // name="person-circle"
        name='disc'
        color={'white'}
        size={35}
      />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={onShowNavigation}
      >
       <Ionicons
        style={{ alignSelf: 'center', margin: 2 }}
        name='compass'
        color={'white'}
        size={35}
      />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleMapViewFull;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    bottom: 150,
    right: 25,
    backgroundColor: 'blue',
    borderRadius: 50,
    elevation: 5,
    
  },
  navigationButton:{
    position: 'absolute',
    bottom: 95,
    right: 25,
    backgroundColor: 'blue',
    borderRadius: 10,
    elevation: 5,
  },
});