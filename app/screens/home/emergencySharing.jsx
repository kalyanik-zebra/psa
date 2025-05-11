import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper'
import { IP, PORT } from '@/data/dbconfig';
import axios from 'axios';
const SafetyCheck = () => {
  const [Reason, setReason] = useState('');
  const [duration, setDuration] = useState('');
  const [contacts, setContacts] = useState('');

  const [ReasonModalVisible, setReasonModalVisible] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [checked, setChecked] = useState(false)
  const [list, setList] = useState([]);
  const [checkedItems, setCheckedItems] = useState({})

  const [currentPage, setCurrentPage] = useState('form');

  const toggleCheckbox = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }
  
const sendCheckedItems = () => {
   const checked = list.filter(item => checkedItems[item.id]);
   console.log('Checked Items:', checked);
   // Here you can send the checked items to a server or handle them as needed
   };
  
  const emergencyActivate = () => {
    console.log("Emergency");
  };

  const handleNext = () => {
    setCurrentPage('nextPage');
  };

  const handleBack = () => {
    setCurrentPage('form');
  };

  useEffect(() => {
    
  const renderContact = async () => {
    try {
      const res = await axios.get(`http://${IP}:${PORT}/contacts`);
       setContacts(res.data)
    } catch (error) {
      console.log("Error in fetching contacts ", error)

    }
  }
 renderContact();
  }, [])

  return (
    <View style={styles.container}>
      {currentPage === 'form' ? (
        <>
        <View style={styles.secTrack}>
          <Text style={styles.inText}>Want to start Security Track?</Text>
          <View style={styles.inReason}>
            <TouchableOpacity onPress={() => setReasonModalVisible(true)} style={styles.input}>
              <Text style={{color: 'rgb(182, 182, 182)'}}>{Reason || "Select Reason"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inReason}>
            <TouchableOpacity onPress={() => setDurationModalVisible(true)} style={styles.input}>
              <Text style={{color: 'rgb(182, 182, 182)'}}>{duration || "Select Duration"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={{color: 'rgb(182, 182, 182)', fontSize: 17}}><Ionicons name='alert-outline' size={18} color={'rgb(182, 182, 182'}/>Your Reason remains private to you unless the emergency sharing(SOS) mode turns on.</Text>
          </View>
        </View>
        <View style={styles.buttonPanel}>
        <TouchableOpacity style={styles.backbutton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
      </>
      ) : (
        <View style={styles.nextPage}>
           <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.contactHeader}>
                <View style = {styles.contactInfo}>
                  <Text style={styles.contactText}>{`${item.name}`}</Text>
                  <Text style={styles.contactPhone}>{`${item.phone}`}</Text>
                 
                </View>                                 
                <View style={styles.checkboxContainer}>
                              <Checkbox
                              status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                              onPress={() => toggleCheckbox(item.id)}
                              />
                    </View>
              </View>
          )}
        />
          <TouchableOpacity style={styles.backbutton} onPress={handleBack}>
           
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reason Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ReasonModalVisible}
        onRequestClose={() => setReasonModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Reason</Text>
            <TouchableOpacity onPress={() => { setReason('Walking Out alone'); setReasonModalVisible(false); }}>
              <Text style={styles.modalOption}>Walking out ALONE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setReason('Running'); setReasonModalVisible(false); }}>
              <Text style={styles.modalOption}>Running</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setReason('Going with group'); setReasonModalVisible(false); }}>
              <Text style={styles.modalOption}>Going with Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {setReason('Other'); setReasonModalVisible(false);}}>
              <Text style={styles.modalOption}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Duration Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={durationModalVisible}
        onRequestClose={() => setDurationModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            <TouchableOpacity onPress={() => { setDuration(900000); setDurationModalVisible(false); }}>
              <Text style={styles.modalOption}>15 mins</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(1200000); setDurationModalVisible(false); }}>
              <Text style={styles.modalOption}>20 min</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(1800000); setDurationModalVisible(false); }}>
              <Text style={styles.modalOption}>30 mins</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(3600000); setDurationModalVisible(false); }}>
              <Text style={styles.modalOption}>1 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDuration(7200000); setDurationModalVisible(false); }}>
              <Text style={styles.modalOption}>2 hours</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SafetyCheck;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(164, 164, 164, 0.29)',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 10
  },
  secTrack: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    // borderColor: 'white',
    justifyContent: 'center',
    // borderWidth: 1
  },
  inReason: {
    flex: 0,
    alignItems: 'center',
    height: '13%',
    marginBottom: 10,
  },
 
  info: {
    textAlign: 'center',
    margin: 20,
    marginTop: 60
  },
  inText: {
    fontSize: 25,
    font: 'SpaceMono',
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(215, 222, 218)'
  },
  input: {
    flex: 0,
    height: '100%',
    width: '85%',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(87, 86, 82, 0.5)',
    paddingHorizontal: 40,
    // elevation: 5,
    shadowOffset: 0.1,
    borderRadius: 30
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 15
  },
  backbutton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5
  },
  nextPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageText: {
    fontSize: 18,
    marginBottom: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10
  },
  modalOption: {
    fontSize: 16,
    padding: 10
  },
  contactHeader: {
    borderColor: 'white',
    backgroundColor: 'rgba(147, 144, 140, 0.71)',
    width: '95.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 5,
    // borderWidth: 2,
    borderRadius: 20
  },
  
checkboxContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   },
  
  contactInfo:{
    flex: 1,
    flexDirection: 'column'
  },

  contactText: {
    color: 'rgb(215, 222, 218)',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 2
  },

  contactPhone:{
    color: 'rgb(182, 182, 182)',
    marginLeft: 2
  },

});
