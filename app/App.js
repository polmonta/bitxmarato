import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/MainScreen'; 
import Febre from './src/screens/Febre'; 
import Desaturacio from './src/screens/Desaturacio'; 
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Main"  screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: () => ({}),  // Overrides the interpolation to do nothing
        transitionSpec: { open: { animation: 'timing', config: { duration: 10 } }, close: { animation: 'timing', config: { duration: 10 } }, },
      }}>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Febre" component={Febre} options={{ headerShown: false }} />
        <Stack.Screen name="Desaturacio" component={Desaturacio} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}