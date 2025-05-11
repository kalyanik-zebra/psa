import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Animated
} from 'react-native';

   
    const CustomDropdown = ({ options, selectedValue, onValueChange, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    
    const handleSelect = (value) => {
        onValueChange(value);
        setIsVisible(false);
    };
    
    const selectedOptionColor = options.find((option) => option.value === selectedValue)?.color || 'white';
   
    useEffect(() => {
        Animated.timing(rotation, {
        toValue: isVisible ? 1 : 0, 
        duration: 200,
        useNativeDriver: true,
        }).start();
    }, [isVisible]);

    const rotateIcon = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'], // Rotate from 0 to 90 degrees
    });

  return (
    <View>
      <TouchableOpacity
        style={[styles.dropdownButton, { backgroundColor: selectedOptionColor }]} 
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Text>

        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <Ionicons name="chevron-down-outline" color={'#333340'} size={23} />
        </Animated.View>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        />
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { backgroundColor: item.color }]}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderColor: '#494666',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingHorizontal: 15
    
    
  },
  dropdownButtonText: {
    fontSize: 14,
    color: 'hsla(0, 3.60%, 26.90%, 0.65)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'hsla(0, 3.60%, 26.90%, 0.65)',
  },
  dropdownContainer: {
    backgroundColor: '#E6E7E6',
    borderRadius: 10,
    borderBottomEndRadius: 0,
   
    padding: 10,
    marginTop: 'auto',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 1,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomDropdown;