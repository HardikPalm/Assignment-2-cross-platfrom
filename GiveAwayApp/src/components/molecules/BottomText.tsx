import React, { useState } from 'react';

import {

    ActivityIndicator,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../utils/colors/colors';
import { Fonts } from '../../utils/fonts/fonts';
import CustomText from '../atoms/CustomText';


const BottomText = (props: any) => {


    const {
        title = '',
        subTitle = '',
        onPress,
        style,
        loading = false,
        indicatorColor = Colors.White
    } = props


    return (

        <View style={[{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }, style]}>
            {loading ?
                <ActivityIndicator size={'large'} color={indicatorColor} ></ActivityIndicator>
                :
                <>
                    <CustomText style={{ alignSelf: 'center', fontSize: 14, color: Colors.White }}>{title}</CustomText>
                    <TouchableOpacity onPress={onPress}>
                        <CustomText style={{ color: Colors.Green, fontSize: 14, }}> {subTitle}</CustomText>
                    </TouchableOpacity>
                </>}
        </View >
    )


}

export default BottomText