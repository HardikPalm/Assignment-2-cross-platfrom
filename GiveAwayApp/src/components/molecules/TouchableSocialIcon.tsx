import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../../utils/imageSource/imageSource'
import Dimensions from '../../utils/dimension/dimensions'
import { Colors } from '../../utils/colors/colors'

const TouchableSocialIcon = (props: any) => {
    const {
        type = 'google',
        onPress } = props

    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: Colors.White, borderRadius: Dimensions.WP_8 }}
            onPress={onPress}
        >
            <Image resizeMode='contain' source={Images[type]} style={{ width: Dimensions.WP_6, height: Dimensions.WP_6 }}></Image>
        </TouchableOpacity>
    )
}

export default TouchableSocialIcon

const styles = StyleSheet.create({})