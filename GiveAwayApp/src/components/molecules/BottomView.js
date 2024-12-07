import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    useWindowDimensions,
    FlatList
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from '../../utils/colors/colors';


const BottomView = (props) => {


    const { style } = props
    return (

        <View style={[styles.bottomViewStyle, style]}>
            {
                props.children
            }
        </View>
    )
}

const styles = StyleSheet.create({
    bottomViewStyle: {
        // paddingHorizontal: 25,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        // alignSelf: 'flex-end',
        borderColor: 'black',
        justifyContent: "center",
        // borderWidth: 1,
        alignItems: 'center',
        paddingBottom: isIphoneX() ? 35 : 15,
        paddingTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        backgroundColor: Colors.White
    }
})

export default BottomView