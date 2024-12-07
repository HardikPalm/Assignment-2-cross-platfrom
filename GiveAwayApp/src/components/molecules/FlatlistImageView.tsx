import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dimensions from '../../utils/dimension/dimensions'
import CustomText from '../atoms/CustomText'
import { Images } from '../../utils/imageSource/imageSource'
import { Colors } from '../../utils/colors/colors'
import { Fonts } from '../../utils/fonts/fonts'

const FlatlistImageView = (props: any) => {

    const {
        width = Dimensions.WP_52
    } = props

    return (
        <View>
            <View style={{ width: width, aspectRatio: 1, borderRadius: 20, backgroundColor: Colors.GreyLight }}>

            </View>
            <View style={{ position: 'absolute', width: width, top: 0, height: 50, paddingHorizontal: 15, paddingVertical: 13, flexDirection: 'row', flex: 1 }}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 0, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Grey }}>
                    <CustomText style={{ fontSize: 12, fontFamily: Fonts.Bold }}>Featured</CustomText>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                    <Image style={{ height: Dimensions.WP_6, width: Dimensions.WP_6 }} source={Images.heart}></Image>
                </View>
            </View>
        </View>
    )
}

export default FlatlistImageView

const styles = StyleSheet.create({})