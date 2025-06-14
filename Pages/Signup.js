import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !password) {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }

    try {
      const response = await fetch('https://api.sheetbest.com/sheets/06526569-808a-42e4-9e31-b9239b3a02ca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Password: password }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Signup successful');
        setName('');
        setPassword('');
      } else {
        Alert.alert('Error', 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CINEFLIX</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter Your Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Enter Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.codeButton}>
          <Text style={styles.codeButtonText}>Use a sign-in code</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    color: 'red',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  or: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeButton: {
    backgroundColor: '#555',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  codeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default Signup;
