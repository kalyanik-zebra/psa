import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
const SignUp = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [fullName, setFullName] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showThankYou, setShowThankYou] = useState(false);
const navigation = useNavigation();
const handSignUp = async() => {
 if (!email || !password || !fullName) {
      Alert.alert('Validation Error', 'Email and Password are required');
      return;
    }

    try {
      const user = {
        email: email,
        name: fullName,
        password: password
      };
      const res = await axios.post(`http://${IP}:${PORT}/signin`, user);
      console.log('Sign in Successful, ', res.data.token);
      setShowThankYou(true)
      setTimeout(() => {
      setShowThankYou(false);
      navigation.navigate('Tab')
    }, 3000);
    } catch (error) {
      console.log('Error Occurred!!', error);
      Alert.alert('Error', 'Something Went Wrong');
    }
};

return (<View style={styles.container}>
{showThankYou ? (
          // Full-screen "Thank You" animation
          <Animatable.View
            animation="fadeIn"
            duration={1000}
            style={styles.thankYouContainer}
          >
            <Text style={styles.thankYouText}>Thank you for your contribution!</Text>
          </Animatable.View>
):(
   <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
  <Text style={styles.title}>Create New Account</Text>
    <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
    />
    <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
    />
     <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
    />
     <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
    />
    <TouchableOpacity style={styles.button} onPress={handSignUp}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Sign Up</Text>
    </TouchableOpacity>
  </ScrollView>
  </KeyboardAvoidingView>
)}
</View>
);
};


const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 padding: 16,
 backgroundColor: 'white'
},
title: {
 fontSize: 24,
 marginBottom: 16,
 textAlign: 'center',
 fontWeight: 'bold'
},
input: {
 height: '7%',
 borderColor: 'gray',
 borderWidth: 1,
 marginBottom: 12,
 borderRadius: 5,
 paddingHorizontal: 8,
},

note: {
 fontSize: 15,
 color: 'blue',
 fontWeight: 'semibold',
 alignSelf: 'center',
 margin: 20,
 textDecorationLine: 'underline'
},
button:{
 height: '6%',
 width: '100%',
 backgroundColor: 'rgba(14, 41, 106, 0.96)',
 justifyContent: 'center',
 alignItems: 'center'
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

export default SignUp;