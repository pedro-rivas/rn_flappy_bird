import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default ({ score, action }) => {

    return(
        <View style={styles.grap}>
            <View style={styles.scoreGrap}>
                <Text style={styles.scoreLabel}>score</Text>
                <Text style={styles.score}>{ score }</Text>
            </View>
            <TouchableOpacity onPress={()=> action()}>
                <View style={styles.btnGrap}>
                    <View style={styles.whiteGrap}>
                        <View style={styles.orangeGrap}>
                            <Text style={styles.btnLabel}>restart</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    grap:{
        alignItems:'center', 
        justifyContent:'center', 
        width, 
        height, 
        position:'absolute', 
        left:0, 
        top:0, 
        zIndex: 10, 
    },
    scoreGrap:{
        backgroundColor:'#ded895', 
        borderColor:'#543847', 
        borderWidth:2, 
        borderRadius:8, 
        padding:20, 
        paddingBottom:30, 
        paddingTop:30, 
        marginBottom:40, 
        justifyContent:'center', 
        alignItems:'center',
    },
    scoreLabel:{
        color:'#fc7858', 
        fontSize:13, 
        lineHeight:13, 
        letterSpacing:-1, 
        textTransform: 'uppercase', 
        fontFamily:'retro', 
        marginBottom:10,
    },
    score:{
        color:'white', 
        fontSize:50, 
        lineHeight:50, 
        textShadowRadius:1,  
        textShadowOffset:{width: 0, height: 2},  
        textShadowColor:'black',  
        fontFamily:'number',
    },
    btnGrap:{
        backgroundColor: '#8F5100', 
        padding:2, 
        paddingBottom:6,
        elevation:2, 
    },
    whiteGrap:{
        backgroundColor: '#fefefe', 
        padding: 4
    },
    orangeGrap:{
        backgroundColor:'#FE700B', 
        padding:6, 
        paddingLeft:12, 
        paddingRight:12,
    },
    btnLabel:{
        color:'#fefefe',
        fontSize:22, 
        lineHeight:22, 
        letterSpacing:-1, 
        textShadowRadius:2,  
        textShadowOffset:{width: 2, height: 2},  
        textShadowColor:'#8F5100',  
        textTransform: 'uppercase', 
        fontFamily:'retro'
    },
});

