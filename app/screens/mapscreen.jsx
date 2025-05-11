import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import GoogleMapViewFull from '@/components/Search/GoogleMapViewFull';
import SearchBar from '@/components/Search/SearchBar';
import SheetBody from '@/components/bottomSheet';

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [place, setPlace] = useState(null)

  const [circleColor, setCircleColor] = useState({
    stroke: 'rgba(255, 0, 0, 0.5)', 
    fill: 'rgba(234, 111, 127, 0.4)',
  });

  const sheetRef = useRef(null);
  const snapPoints = ['15%', '30%', '50%'];
  const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
    }, [])

  useEffect(() => {
    const fetchLiveLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required to use this feature.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };

    fetchLiveLocation();
  }, []);

  // Function to handle search input and fetch location
  const searchPlace = async (inputValue) => {
    try {
      setPlace(inputValue)
      const location = await Location.geocodeAsync(inputValue);
      if (location.length > 0) {
        const { latitude, longitude } = location[0];
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Change the circle color based on the search result
        setCircleColor({
          stroke: 'rgba(0, 255, 0, 0.5)', 
          fill: 'rgba(0, 255, 0, 0.2)',
        });

        // Open the bottom sheet
        setShowBottomSheet(true);
        sheetRef.current?.expand();
      } else {
        Alert.alert('Location Not Found', 'Please try a different search term.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Unable to fetch location. Please try again later.');
    }
  };

  // Jump to the user's current location
  const jumpToCurrentLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Reset the circle color to default
      setCircleColor({
        stroke: 'rgba(255, 242, 0, 0.76)', 
        fill: 'rgba(243, 245, 94, 0.4)',
      });
    } catch (error) {
      console.error('Error fetching current location:', error);
      Alert.alert('Error', 'Unable to fetch current location. Please try again later.');
    }
  };


  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
     <SheetBody />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
            <SearchBar searchHandler={searchPlace} />
        </View>

        {/* Map View */}
        {mapRegion ? (
            <GoogleMapViewFull
                mapRegion={mapRegion}
                circleColor={circleColor}
                onJumpToCurrentLocation={jumpToCurrentLocation}
                style={styles.mapViewFull}
            />
        ) : null}

        {/* Bottom Sheet */}
        {showBottomSheet && (
            <GestureHandlerRootView style={styles.overlay}>
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    // onChange={handleSheetChanges}
                    onClose={() => setShowBottomSheet(false)}
                >
                    <BottomSheetView  style={
             { backgroundColor: '#C5D3E8',
              height: '100%'
             }
            }>
                        <SheetBody place={place} /> 
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
    padding: 10,
    elevation: 5
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    width: '100%',
    flex: 1
  },
  sheetPanel: {
    width: '100%', 
    borderRadius: 50,
    shadowColor: '#000', 
    padding: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, 
  },
});