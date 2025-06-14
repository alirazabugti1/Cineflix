import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/image.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.logo}>C</Text>
        <View style={styles.topRight}>
          <Text style={styles.topText}>PRIVACY</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.topText}>SIGN UP</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Unlimited films,</Text>
        <Text style={styles.title}>TV Programmes</Text>
        <Text style={styles.title}>& More</Text>

        <Text style={styles.subtitle}>Already Have An Account?</Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    color: 'red',
    fontSize: 45,
    fontWeight: 'bold',
  },
  topRight: {
    flexDirection: 'row',
    gap: 15,
  },
  topText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 15,
  },
  content: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    marginTop: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
