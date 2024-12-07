import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import FlatlistImageView from './FlatlistImageView'
import Dimensions from '../../utils/dimension/dimensions'
import { Images } from '../../utils/imageSource/imageSource'
import CustomText from '../atoms/CustomText'
import { Fonts } from '../../utils/fonts/fonts'

const PropertyItem = (props: any) => {

    const {
        width = Dimensions.WP_52
    } = props

    return (
        <View>
            <FlatlistImageView width={width}></FlatlistImageView>
            <View style={{ marginTop: 15, width: width }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: Dimensions.WP_6, width: Dimensions.WP_6 }} source={Images.bed}></Image>
                    <CustomText style={{ fontSize: 17, marginLeft: 5 }}>5</CustomText>
                    <Image style={{ height: Dimensions.WP_6, width: Dimensions.WP_6, marginLeft: 15 }} source={Images.shower}></Image>
                    <CustomText style={{ fontSize: 17, marginLeft: 5 }}>2</CustomText>
                    <Image style={{ height: Dimensions.WP_6, width: Dimensions.WP_6, marginLeft: 15 }} source={Images.drawing}></Image>
                    <CustomText style={{ fontSize: 17, marginLeft: 5 }}>2</CustomText>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text
                        style={{ fontFamily: Fonts.Bold, fontSize: 17 }}
                        numberOfLines={2}>This is an eye catching title for the property to sell</Text>
                    <CustomText style={{ marginTop: 10 }}>Offers over</CustomText>
                    <CustomText style={{ marginTop: 10, fontSize: 17, fontFamily: Fonts.Bold }}>$2,000,000</CustomText>
                </View>
            </View>
        </View>
    )
}

export default memo(PropertyItem)

const styles = StyleSheet.create({})