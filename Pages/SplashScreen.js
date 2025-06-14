import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={['#2c2c2c', '#000']}
      style={styles.container}
    >
      <Text style={styles.title}>CINEFLIX</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#e50914',
    fontSize: 65,
    fontWeight: 'bold',
  },
});
