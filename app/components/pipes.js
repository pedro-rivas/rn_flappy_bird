import React, { useEffect, useRef, useState, } from 'react';
import { Dimensions, Animated, StyleSheet, Easing, UIManager, findNodeHandle} from 'react-native';


import { pipes } from '../global';

const { width, height } = Dimensions.get('screen');
const time = 6000;
let upPipePosition =  0; 
let downPipePosition = 0;

export default () => {

    const [pipePosition, setPipePosition] = useState({up: 0, down: 0});
    const pipeXValue = useRef(new Animated.Value(0)).current;
    const pipeTop = useRef(null);
    const pipeBottom = useRef(null);

    useEffect(() => {
       

        // setInterval(()=>{
        //     pipeTop.current.measure((x,y,width,height, pageX, pageY) => {
        //         console.log(pageX, pageY);
        //         if(pageX < width/2) console.log('point');
        //     })
        // },500);
        initPipes();

    }, []);

    function initPipes(){

        upPipePosition =  Math.floor((Math.random() * height - pipes.bottomLimit  - 20) + pipes.freeHeight); 
        downPipePosition = height - upPipePosition + pipes.freeHeight;
        setPipePosition({up: upPipePosition, down: downPipePosition });
        Animated.timing(pipeXValue, {
          toValue: - width - pipes.width,
          duration: 3500,
          easing: Easing.linear,
          useNativeDriver: time, 
        }).start(() => {
            pipeXValue.setValue(0);
            initPipes();
        });
    }

    return(
       <>
        <Animated.Image
          ref={pipeTop}
          source={require('../resources/pipe-green-down.png')}
          style={{... styles.pipe, bottom: pipePosition.down,  transform: [ { translateX: pipeXValue } ] }}
        />
        <Animated.Image
          ref={pipeBottom}
          source={require('../resources/pipe-green-up.png')}
          style={{... styles.pipe, top: pipePosition.up, transform: [ { translateX: pipeXValue } ] }}
        />
       </>
    );
};

const styles = StyleSheet.create({
    pipe:{
        width: pipes.width, 
        height: pipes.height, 
        position: 'absolute', 
        right: -pipes.width,
        zIndex: 1,
    },
});

