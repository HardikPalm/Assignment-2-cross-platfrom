import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Dimensions from '../../utils/dimension/dimensions';
import { Images } from '../../utils/imageSource/imageSource';



const ImageBanner = () => {

    return (
        <Image
            style={{
                height: Dimensions.HP_42, width: Dimensions.WP_100,
                borderBottomLeftRadius: 20, borderBottomRightRadius: 20
            }}
            resizeMode={'cover'}
            source={Images.banner}></Image>
    )
}

export default ImageBanner