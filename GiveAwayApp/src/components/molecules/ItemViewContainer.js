

import React from 'react';

import {
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { Colors } from '../../utils/colors/colors';


const ItemViewContainer = (props) => {

    const {
        onPress
    } = props

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: Colors.White, borderRadius: 10, padding: 15, ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowRadius: 2,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.16,
                    },
                    android: {
                        elevation: 4,
                    },
                })
            }}>
            {
                props.children
            }
        </TouchableOpacity>
    )
}

export default ItemViewContainer