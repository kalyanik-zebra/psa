import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const SearchBar = ({ searchHandler }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      searchHandler(inputValue);
    }
  };
 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a place..."
        value={inputValue}
        onChangeText={setInputValue}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
      <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 60,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  button: {
    height: 'auto',
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: 'white',
    alignItems: 'center',
    borderRadius: 50

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});