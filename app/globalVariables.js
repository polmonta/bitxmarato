import {Dimensions } from 'react-native';

const window = Dimensions.get('window');
export const Width = window.width;
export const Height = window.height;

export const API_URL = 'http://172.20.10.7:3000' //PORTATIL = 'http://192.168.1.57:3000' PC = 'http://192.168.1.45:3000'; MOBIL: http://172.20.10.7:3000

export const isLightMode = true;
export const modeA = isLightMode ? '#f3f2f7' : '#111';
export const modeB = isLightMode ? '#000' : '#fff';
export const Contrast = isLightMode ? '#fff' : '#1c1c1e';



























