import React, { useEffect, useRef, } from 'react';
import { Dimensions, Animated, StyleSheet, Easing, Image } from 'react-native';


import { ground } from '../global';

const { width, } = Dimensions.get('screen');
const time = 2000;

export default () => {

    const xValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();
    }, []);

    function startAnimation(){
        Animated.loop(
            Animated.timing(xValue, {
                useNativeDriver: true,
                toValue: - width,
                duration: time,
                easing: Easing.linear,
            })
        ).start();
    }

    return(
        <Animated.View style={[styles.grap, { transform: [{ translateX: xValue }] }]}>            
            <Image
                source={require('../resources/base.png')}
                style={styles.image}
            />
             <Image
                source={require('../resources/base.png')}
                style={styles.image}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    grap:{
        flexDirection:'row',
        position:'absolute',
        left: 0,
        bottom:0,
        zIndex:5, 
    },
    image:{
        width, 
        height: ground.height,
    }
});

