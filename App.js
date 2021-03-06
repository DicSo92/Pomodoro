import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Components/Home';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}
                              options={{
                                  title: 'POMODORO',
                                  headerStyle: {
                                      backgroundColor: '#f4511e',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                      fontWeight: 'bold',
                                  },
                              }}
                />
            </Stack.Navigator>
        </ NavigationContainer>
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
