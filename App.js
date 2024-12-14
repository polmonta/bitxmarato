import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Febre'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Main"  screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: () => ({}),  // Overrides the interpolation to do nothing
        transitionSpec: { open: { animation: 'timing', config: { duration: 10 } }, close: { animation: 'timing', config: { duration: 10 } }, },
      }}>
        <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}