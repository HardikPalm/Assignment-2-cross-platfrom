import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { fontScaleNormalize } from '../../utils/functions/commanFunctions'
import { Fonts } from '../../utils/fonts/fonts'
import { Colors } from '../../utils/colors/colors'
import RightArrow from '../../assets/svgs/RightArrow'

const ButtonWithIcon = (props: any) => {

    const {
        showIconLeft = true,
        title = '',
        style,
        icon = '',
        disable = false,
        onPress,
        textStyle,
        loading = false,
        indicatorColor = Colors.White
    } = props

    const RightIcon = () => {

        return (

            props.rightIcon

        )
    }

    const leftIcon = () => {

        return (
            props.leftIcon
        )
    }



    return (
        <TouchableOpacity style={[{
            width: '100%',
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 1,
            // height: 62,
            paddingVertical: 13,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
            style]}
            disabled={disable ? disable : loading ? true : false}
            onPress={onPress}
        >{
                loading ?
                    <ActivityIndicator size={'large'} color={indicatorColor}></ActivityIndicator>
                    :
                    <>
                        {
                            leftIcon()
                        }
                        <CustomText style={[{ fontSize: 16, fontFamily: Fonts.Regular, color: Colors.White, marginHorizontal: 7 }, textStyle]}>{title}</CustomText>
                        {
                            RightIcon()
                        }
                    </>}

        </TouchableOpacity>
    )
}

export default ButtonWithIcon

const styles = StyleSheet.create({})