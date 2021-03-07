import { Dimensions, } from 'react-native';

const { width, height, } = Dimensions.get('screen');
const birdWidth = width*.12;

const bird = {
    width: birdWidth,
    height:  birdWidth * .70,
    initialBounceJumpHeight: 20,
    initialBouncingTime: 1000,
};

const ground = {
    height: width*.333,
};

const freeHeight = height - 640 <  bird.height * 4 ? bird.height * 4 : height - 640;

const pipes = {
    height: height-ground.height,
    width: (height-ground.height) * .1625,
    bottomLimit: ground.height,
    freeHeight: bird.width* 5,
    freeSpaceToShow: ground.height + freeHeight,
};


export {
    bird,
    ground, 
    pipes,
}