import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Dimensions from '../../utils/dimension/dimensions'

const IconButton = (props: any) => {

    const {
        icon,
        onPress,
        style,
        iconStyle
    } = props
    return (
        <TouchableOpacity style={[{ padding: 10, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }, style]}
            onPress={onPress}
        >
            <Image source={icon} style={[{ height: Dimensions.WP_6, width: Dimensions.WP_6 }, iconStyle]}
                resizeMode={'contain'}
            ></Image>
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({})