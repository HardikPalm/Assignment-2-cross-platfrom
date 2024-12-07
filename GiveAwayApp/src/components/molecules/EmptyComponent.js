import Lottie from 'lottie-react-native';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Images } from '../../utils/imageSource/imageSource';


const EmptyComponent = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Lottie
                autoPlay autoSize renderMode=''
                source={Images.Nodata}
                style={{ alignSelf: 'center' }}
            />
        </View>
    )
}

export default EmptyComponent