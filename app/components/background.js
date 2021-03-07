import React from 'react';
import { Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default () => (
    <Image
        source={require('../resources/background-day.png')}
        style={{width, height, position:'absolute', left:0, top:0, zIndex:-1}}
    />
);

