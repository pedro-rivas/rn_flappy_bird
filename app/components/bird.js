import React, { useEffect, useState, } from 'react';
import { StyleSheet, Image, } from 'react-native';

import { bird } from '../global';

const speed = 140;
let timer;
let startMove = 'yellowbird-downflap';

export default () => {

    const [birdMove, setBirdMove] = useState(startMove);

    useEffect(()=>{
        timer = setInterval(() => {
            if(startMove  === 'yellowbird-downflap'){
                startMove = 'yellowbird-midflap';
            }else if(startMove  === 'yellowbird-midflap'){
                startMove = 'yellowbird-upflap';
            }else if(startMove === 'yellowbird-upflap'){
                startMove = 'yellowbird-downflap';
            }
            setBirdMove(startMove);
        }, speed);
        return () => clearInterval(timer);
    },[]);

    return(
        <>
        { birdMove === 'yellowbird-downflap' ?
            <Image
                source={require('../resources/yellowbird-downflap.png')}
                style={styles.image}
            />
            :  birdMove === 'yellowbird-upflap' ?
            <Image
                source={require('../resources/yellowbird-upflap.png')}
                style={styles.image}
            />
            :
            <Image
                source={require('../resources/yellowbird-midflap.png')}
                style={styles.image}
            />
        }
        </>
    );
};

const styles = StyleSheet.create({
    image:{
        width: bird.width,
        height: bird.height, 
    },
});

