import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook



import { modeA, modeB, Width, Height } from '../../globalVariables';


const HomeScreen = () => {
  const [activeButton, setActiveButton] = useState(null); // Estado para el botón activo
  
    const handlePress = (button) => {
        // Si se presiona el botón activo, lo desactiva, si no, activa el nuevo botón
        setActiveButton((prevActive) => (prevActive === button ? null : button));
    };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>Ha notat tiratge muscular per respirar?</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[ styles.buttonYes, activeButton === 'button1' && styles.buttonActiveYes,]} onPress={() => handlePress('button1')} >
                    <View style={styles.iconContainer}>
                        <Image source={require('../images/yes.png')} style={styles.icon} /> 
                    </View>
                    <Text style={styles.buttonText}>SI  </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[ styles.buttonNo, activeButton === 'button2' && styles.buttonActiveNo,]} onPress={() => handlePress('button2')} >
                    <View style={styles.iconContainer}>
                        <Image source={require('../images/cross.png')} style={styles.icon} resizeMode='stretch'/> 
                    </View>
                    <Text style={styles.buttonText}>NO </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.arrowsContainer}>
            <TouchableOpacity style={[styles.arrowContainer, {marginLeft: '5%' }]} onPress={() => navigation.navigate("Respiracions")}>
                <Image source={require('../images/flechas.png')} style={[styles.icon, { transform: [{ rotate: '180deg' }]}]} /> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate("Ofeg")}>
                <Image source={require('../images/flechas.png')} style={styles.icon} /> 
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

    questionContainer: {
        width: Width*0.8,
        height: Height*0.2,
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: Height*0.2,
        alignSelf: 'center',
    },

    questionText: {
        fontSize: 30,
        fontWeight:'bold',
        color: modeB,
        textAlign: 'center',
    },

    buttonsContainer: {
        flexDirection: 'column',
        width: Width,
        height: Height*0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        height: '25%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonYes: {
        height: '100%',
        width: '45%',
        backgroundColor: 'green',
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    buttonActiveYes: {
        backgroundColor: 'green', // Color diferente para el botón activo
        opacity: 0.7, // Cambiar opacidad cuando está activo
        shadowColor: 'green',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 2,
        shadowRadius: 20,
        elevation: 0,
        borderColor: 'black',
        borderWidth: 5,
    },
    buttonNo: {
        height: '100%',
        width: '45%',
        backgroundColor: 'red',
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    buttonActiveNo: {
        backgroundColor: 'red', // Color diferente para el botón activo
        opacity: 0.7, // Cambiar opacidad cuando está activo
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 2,
        shadowRadius: 20,
        elevation: 0,
        borderColor: 'black',
        borderWidth: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 40,
        alignSelf:'center',
    },
    iconContainer: {
        width: '25%',
        height: '50%',
        alignSelf: 'center',
    },

    arrowsContainer: {
        flexDirection: 'row',
        height: Height*0.1,
        marginTop: Height*0.05,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowContainer: {
        height: '80%',
        width: '20%',
        marginRight: '5%',
    },
    icon: {
        width:'100%',
        height: '100%',  
    }
});

export default HomeScreen;
 