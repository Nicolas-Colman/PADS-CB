import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import Login from "./Src/views/login";
import Cadastro from './Src/views/Cadastro';
import Home from './Src/views/home';
import Menu from './Src/views/Menu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>      
      <Stack.Screen name ="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
      <Stack.Screen name="Menu"     component={Menu} options={{headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
