import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, View } from 'react-native'; 
import Login from './screens/Auth/Login'; 
import Register from './screens/Auth/Register';

export default function App() { 
  // State to track whether to show Login or Register screen
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' or 'register'

  return ( 
    <View style={styles.container}> 
      {currentScreen === 'login' ? (
        <Login onSwitchToRegister={() => setCurrentScreen('register')} /> 
      ) : (
        <Register onSwitchToLogin={() => setCurrentScreen('login')} />
      )}
      <StatusBar style="auto" /> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
  }, 
});