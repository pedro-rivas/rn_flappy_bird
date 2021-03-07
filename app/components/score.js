import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, StatusBar} from 'react-native';

const { width, } = Dimensions.get('screen');

export default ({ score }) => {

    const [scoreWidth, setScoreWidth] = useState(30);
    
    const getWidth = ({ nativeEvent: { lines } }) => setScoreWidth(lines[0].width);

    return(
        <View style={styles.grap}>
            <Text style={{...styles.btnLabel, left: (width/2)-(scoreWidth/2)}} onTextLayout={getWidth}>{score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    grap:{
        position:'absolute', 
        top: StatusBar.currentHeight + 40, 
        zIndex: 10, 
    },
    btnLabel:{
        color:'white', 
        fontSize:60, 
        lineHeight:60, 
        textShadowRadius:1,  
        textShadowOffset:{width: 0, height: 2},  
        textShadowColor:'black',  
        fontFamily:'number',
    },
});

