import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { IP } from '@/data/dbconfig'
import { SOSContext } from '@/components/Context/SendSOSContext';



const EmergencyC = ({ currentLocation }) => {
  const { sendSOS } = React.useContext(SOSContext);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log(`http://${IP}:4000/contacts`)
        // console.log("Fetching contacts...")
        const response = await axios.get(`http://${IP}:4000/contacts`);
        setContacts(response.data);
        // console.log("response.data", response.data)
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch contacts.');
        console.log(error)
      }
    };
    fetchContacts();
  }, []);

  const handleSOS = async () => {
    await sendSOS()
  };
  const addContact = async () => {
    console.log("Contact being added");
  
    if (newContact.trim() === '' || phone.trim() === '') {
      Alert.alert('Invalid Input', 'Both name and phone number are required.');
      return;
    }
  
    try {
      const newContactObj = { id: contacts.length + 1, name: newContact.trim(), phone: phone.trim() };
      console.log('Sending request with:', newContactObj); // Log the request body
  
      const response = await axios.post(`http://${IP}:4000/addContacts`, newContactObj);
      // console.log('Response from server:', response.data); // Log the server response
  
      setContacts([...contacts, { id: contacts.length + 1, ...newContactObj }]);
      setNewContact('');
      setPhone('');
      Alert.alert('Success', 'Contact added successfully!');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      Alert.alert('Error', 'Failed to add contact.');
    }
  };

  const deleteContact = async(id) => {
   try {
    console.log("deleting contact: ", id)
    await axios.delete(`http://${IP}:4000/deleteContact`, {
      headers: { id: id },
    }); 

    const response = await axios.get(`http://${IP}:4000/contacts`);
    setContacts(response.data);


    Alert.alert('Success', 'Contact deleted successfully!');
  } catch (error) {
    Alert.alert('Error', 'Failed to delete contact.');
    console.error(error);
  }
  };

  const handleCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Failed to make a call.');
      console.error('Error making call:', err);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.ContactContainer}>
        <Text style={styles.title}>Emergency Contacts</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contactHeader}>
              <View style = {styles.contactInfo}>
                <Text style={styles.contactText}>{`${item.name}`}</Text>
                <Text style={styles.contactPhone}>{`${item.phone}`}</Text>
              
              </View>
              <Ionicons style={styles.trash} name="trash" color={'#ff0000'} size={25} onPress={() => deleteContact(item.id)} />
              <Ionicons name="call" color={'#228b22'} size={25} onPress={() => handleCall(item.phone)}/>
            </View>
          )}
        />
        <View style={styles.addContactContainer}>
          <View style={styles.addContactInformation}>
            <TextInput
              style={styles.input}
              placeholder="Add Name"
              value={newContact}
              onChangeText={setNewContact}
            />
            <TextInput
              style={styles.input}
              placeholder="Add Contact (Phone Number)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addContact}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosButtonText}>SOS(Emergency Button)</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyC;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'scroll',
    flex: 1,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: '5%',
    marginTop: '8%'
  },

  contactHeader: {
    borderColor: 'white',
    backgroundColor: '#d3d3d3',
    width: '97.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 5,
    borderWidth: 2,
    borderRadius: 9
  },

  contactInfo:{
    flex: 1,
    flexDirection: 'column'
  },

  contactText: {
    color: '#00468b',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 2
  },

  contactPhone:{
    color: '#363636',
    marginLeft: 2
  },

  ContactContainer: {
    padding: 10,
    color: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  addContactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: '15%',
  },

  addContactInformation: {
    flex: 1,
    flexDirection: 'column',
  },

  input: {
    height: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    margin: 2,
  },

  addButton: {
    marginLeft: 5,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: '90%',
    justifyContent: 'center',
  },

  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  sosButton:{
    backgroundColor: 'red',
    height: '7%',
    width: '98%',
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: '26%'
  },
  
  sosButtonText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },

  trash:{
    marginRight: 20
  }
});