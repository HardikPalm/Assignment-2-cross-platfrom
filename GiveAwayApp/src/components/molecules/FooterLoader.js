import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../utils/colors/colors';


const FooterLoader = (props) => {


    const {
        color = Colors.AppThemeBlue
    } = props

    return (
        <View >
            <ActivityIndicator size={'large'} style={{ alignSelf: 'center' }} color={color}></ActivityIndicator>
        </View >
    )
}

export default FooterLoader