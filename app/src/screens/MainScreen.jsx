import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import QRCode from 'react-native-qrcode-svg';



import { modeA, modeB, Width, Height } from '../../globalVariables';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [qrSize, setQrSize] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>MALLOL CORTIT, MARC</Text>
      </View>
      <View style={styles.qrContainer}>
        <View style={styles.qr} onLayout={(event) => { const { width, height } = event.nativeEvent.layout; setQrSize(Math.min(width, height));}}>
          <QRCode
          value="https://www.google.com" // Aquí coloca la URL a la que deseas redirigir
          size={qrSize}
          color="black" // Color del código QR
          backgroundColor= "#f3f2f7" // Fondo del código QR
          />
        </View>
      </View>
      <View style={styles.sosButtonContainer}>
        <TouchableOpacity style={styles.sosButton} onPress={() => navigation.navigate("Febre")}>
            <View style={styles.iconContainer}>
                <Image source={require('../images/quest.png')} style={styles.icon} ></Image>
            </View>
            <Text style={styles.sosText}>S.O.S   </Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modeA,
    },

    nameContainer: {
        backgroundColor: modeA,
        width: Width,
        height: Height*0.15,
        justifyContent: 'flex-end', // Align text to the bottom
        alignItems: 'center',
    },

    nameText: {
        fontSize: 25,
        fontWeight:'semibold',
        color: 'blue',
    },

    qrContainer: {
        backgroundColor: modeA,
        width: Width,
        height: Height*0.5,
        justifyContent: 'center',
    },
    qr: {
        width: '70%',
        height: '65%',
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden',
    },

    sosButtonContainer: {
        backgroundColor: modeA,
        width: Width,
        height: Height*0.2,
        justifyContent: 'center',
    },

    sosButton:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '55%',
        height: '40%',
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'red',

    },
    iconContainer: {
        width: '25%',
        height: '80%',
        alignSelf: 'center',
    },
    sosText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
      alignSelf: 'center',
    },
    icon: {
      width:'100%',
      height: '100%',  
  }
});

export default HomeScreen;
 