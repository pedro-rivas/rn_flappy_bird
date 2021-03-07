import React, { useEffect, useState, useRef, } from 'react';
import { View, StatusBar, Dimensions, Animated, StyleSheet, Easing, Pressable, } from 'react-native';

import { bird, pipes, } from './app/global';

import { hideNavigationBar } from 'react-native-navigation-bar-color';

import Background from './app/components/background';
import Bird from './app/components/bird';
import Ground from './app/components/ground';
import GameOver from './app/components/game-over';
import Score from './app/components/score';

const {  height, width } = Dimensions.get('screen');
const initialBirdPosition = { top: (height / 2) -  bird.height/2, left: (width / 2) - bird.width/2};

let timer;
let upPipePosition =  0; 
let downPipePosition = 0;
let initialBounceUp = true;
let jumping = false;
let gameRunning = false;
let scoring = false;
let _score = 0;
let pipeTopX = 0;
let pipeBottomX = 0;
let pipeTopY = 0;
let pipeBottomY = 0;
let birdX = 0;
let birdY = 0;


export default () => {

  const [pipePosition, setPipePosition] = useState({up: 0, down: 0});
  const [score, setScore] = useState(_score);
  const [gameOver, setGameOver] = useState(false);
  const birdYValue = useRef(new Animated.Value(height/2)).current;
  const pipeXValue = useRef(new Animated.Value(0)).current;
  const pipeTop = useRef(null);
  const pipeBottom = useRef(null);
  const birdGrap = useRef(null);

  useEffect(()=>{

    hideNavigationBar();
    bounceAnimation();
    timer = setInterval(checkColission, 70);

    return () => { 
      clearInterval(timer);
    }
    
  },[]);

  function checkColission(){
    
    birdGrap.current.measure((x , y, width, height, pageX, pageY) => {
      birdX = pageX;
      birdY = pageY;
    });
    pipeTop.current.measure((x , y, width, height, pageX, pageY) => {
      pipeTopX = pageX;
      pipeTopY = pageY + pipes.height;
    });
    pipeBottom.current.measure((x , y, width, height, pageX, pageY) => {
      pipeBottomX = pageX;
      pipeBottomY = pageY;
    });

    //colission up
    if(pipeTopX < birdX && birdX < (pipeTopX + pipes.width) && birdY < pipeTopY){
        _gameOver();
    }
    //colission down
    if(pipeBottomX < birdX && birdX < (pipeBottomX + pipes.width) && birdY > pipeBottomY){
        _gameOver();
    }
    //score
    if(birdX > (pipeBottomX + pipes.width) && scoring === false){
      scoring = true;
      _score += 1;
      setScore(_score);
      console.log('score: ', _score);
    }
  }

  function _gameOver(){
      clearInterval(timer);
      setGameOver(true);
      gameRunning = false;
      scoring = false;
      gravity();
      console.log('game over');
  }

  function startGame(){
    initPipes();
  }

  function jump(){

    if(gameRunning === false){
      gameRunning = true;
      startGame();
    }
    
    if(birdY > 0 && jumping === false){
      jumping = true;
      Animated.timing(birdYValue, {
        toValue: birdY  - bird.width,
        duration: 80,
        useNativeDriver: false, 
      }).start(()=>{
        jumping = false;
        gravity();
      });
    }
  }

  function initPipes(){
    if(gameRunning === true){
      upPipePosition =  Math.floor((Math.random() * height - pipes.bottomLimit  - 20) + pipes.freeHeight); 
      downPipePosition = height - upPipePosition + pipes.freeHeight;
      setPipePosition({up: upPipePosition, down: downPipePosition });
      Animated.timing(pipeXValue, {
        toValue: - width - pipes.width,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true, 
      }).start(() => {
            pipeXValue.setValue(0);
            scoring = false;
            initPipes();
            console.log('init pipes');
      });
    }else{
      console.log('don´t init pipes');
    }
  }

  const restartGame = () => {  
    bounceAnimation();
    _score = 0;
    setScore(_score);
    timer = setInterval(checkColission, 70);
    setGameOver(false);
    console.log('restart');
  }

  function gravity(){
    Animated.timing(birdYValue, {
      toValue: height - pipes.bottomLimit - bird.height,
      duration: 1000,
      useNativeDriver: false, 
    }).start();
  }

  function bounceAnimation(){
    Animated.timing(birdYValue, {
      toValue: initialBounceUp ? (height/2) + bird.initialBounceJumpHeight : (height/2) - bird.initialBounceJumpHeight,
      duration: bird.initialBouncingTime,
      useNativeDriver: false, 
    }).start(() => {
      initialBounceUp = !initialBounceUp;
      if(gameRunning === false) bounceAnimation();
    });
  }

  console.log('render');

  return(
      <View style={styles.mainGrap}>
        <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0)'} barStyle={'light-content'}/>
        <Background/>
        <Animated.Image
          ref={pipeTop}
          source={require('./app/resources/pipe-green-down.png')}
          style={{... styles.pipe, bottom: pipePosition.down,  transform: [ { translateX: pipeXValue } ] }}
        />
        <Animated.Image
          ref={pipeBottom}
          source={require('./app/resources/pipe-green-up.png')}
          style={{... styles.pipe, top: pipePosition.up, transform: [ { translateX: pipeXValue } ] }}
        />
        <Ground/>
        <Animated.View ref={birdGrap} style={{... styles.birdGrap, top: birdYValue }}>
          <Bird/>
        </Animated.View>
        <Pressable onPress={()=> jump()} style={{ position:'absolute', bottom:0, left:0, zIndex:5, }}>
          <View style={{height, width, backgroundColor:'rgba(0,0,0,0)',}}/>
        </Pressable>
        { 
          gameOver ? 
          <GameOver score={score} action={restartGame}/> 
          : 
          <Score score={score}/> 
        }
      </View>
  );
}


const styles = StyleSheet.create({
  mainGrap:{
    flex:1, 
  },
  birdGrap:{
    ...initialBirdPosition,
    position:'absolute', 
    zIndex:1,
  },
  pipe:{
    width: pipes.width, 
    height: pipes.height, 
    position: 'absolute', 
    right: -pipes.width,
    zIndex: 1,
},
});