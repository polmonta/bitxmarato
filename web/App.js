import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/home';
import GestionPacientsScreen from './src/screens/P1';
import AfegirPacientScreen from './src/screens/P2';
import DiagnosticoScreen from './src/screens/diagnostic';
import VerDetallesScreen from './src/screens/VerDetalles'; // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Inicio' }} 
        />
        <Stack.Screen 
          name="GestionPacients" 
          component={GestionPacientsScreen} 
          options={{ title: 'Gestión de Pacientes' }} 
        />
        <Stack.Screen 
          name="AfegirPacient" 
          component={AfegirPacientScreen} 
          options={{ title: 'Añadir Paciente' }} 
        />
        <Stack.Screen 
          name="Diagnostico" 
          component={DiagnosticoScreen} 
          options={{ title: 'Diagnóstico' }} 
        />
        <Stack.Screen 
          name="VerDetalles" 
          component={VerDetallesScreen} 
          options={{ title: 'Detalles del Paciente' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
