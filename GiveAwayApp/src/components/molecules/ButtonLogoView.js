import React, { useState } from 'react';

import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Dimensions from '../../utils/Dimensions';
import { Images } from '../../utils/ImageSource/imageSource';





const ButtonLogoView = (props) => {

    const {
        style,
        onPress,
        hideBackButton = false
    } = props

    return (
        <View style={[{ width: '100%', flexDirection: 'row', paddingHorizontal: 25, height: Dimensions.HP_10, paddingTop: Dimensions.HP_3, }, style]}>
            {!hideBackButton ? <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                <Image source={Images.BackButton} style={{ height: 30, width: 30, }}></Image>
            </TouchableOpacity> : <View style={{ flex: 1 }}></View>}
            <Image source={Images.AppLogo} style={{ height: 48, width: 46 }}></Image>
        </View>
    )
}

export default ButtonLogoView