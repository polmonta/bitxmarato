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
        <View style={styles.textContainer}>
            <Text style={styles.textFinal}>Cal anar a l'hospital o trucar a una ambulancia</Text>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modeA,
        alignItems: 'center',
    },
    textFinal: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    textContainer: {
        width: Width *0.8,
        height: Height*0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f2f7',
        marginTop: Height*0.3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 2,
        shadowRadius: 20,
        elevation: 0,
        borderRadius: 15,
    },
    
    
  
});

export default HomeScreen;
 