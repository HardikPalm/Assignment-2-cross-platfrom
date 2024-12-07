import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import { Colors } from '../../utils/colors/colors';
import { Fonts } from '../../utils/fonts/fonts';

const BoldText = (props: any) => {

    const {
        style,
        onPress
    } = props

    return (

        <Text
            onPress={onPress}
            style={[styles.defaultStyle, style]}
            allowFontScaling={false}
        >{props.children}</Text>
    )
}

export default BoldText

const styles = StyleSheet.create({
    defaultStyle: {
        color: Colors.Black,
        fontFamily: Fonts.SemiBold
        // fontWeight: '600',
        // letterSpacing: 0.5
    }
})