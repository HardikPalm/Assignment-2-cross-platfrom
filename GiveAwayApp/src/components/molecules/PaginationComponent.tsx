import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Colors } from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';


const PaginationComponent = (props: any) => {

    const {
        currentIndex = 0,
        data = []
    } = props

    const customWidth = Dimensions.WP_40 / data.length

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal
            style={{ alignSelf: 'center', marginTop: 0, }}
            contentContainerStyle={{ padding: 10 }}

            // onScroll={onScroll}
            renderItem={({ item, index }) => {

                return (
                    <View style={{

                        width: index == currentIndex ? customWidth * 1.5 : customWidth,
                        height: index == currentIndex ? 3 : 2,

                        backgroundColor: index == currentIndex ? Colors.Black : Colors.Grey
                        , marginHorizontal: 3,
                        borderRadius: 5
                    }}></View>
                )
            }}

        ></FlatList>
    )
}

export default PaginationComponent