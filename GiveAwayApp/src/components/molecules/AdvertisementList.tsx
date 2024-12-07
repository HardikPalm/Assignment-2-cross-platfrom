import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    useWindowDimensions,
    FlatList
} from 'react-native';
import Dimensions from '../../utils/dimension/dimensions';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';

// import { Images } from '../global/ImageSource';
import PaginationComponent from './PaginationComponent';
import CustomText from '../atoms/CustomText';
import { fontScaleNormalize } from '../../utils/functions/commanFunctions';


const AdvertisementList = (props: any) => {

    const {
        data = []
    } = props

    const width = Dimensions.WP_100;


    const [currentIndex, setCurrentIndex] = useState(0)

    const array = [
        {
            'title': 'Find the perfect home',
            'subTitle': 'Search neighbourhoods by location or activities nearby.',
            'image': 'https://picsum.photos/200/300'
        },
        {
            'title': 'Discover the area',
            'subTitle': 'Understand more about the area, before viewing the property.',
            'image': 'https://picsum.photos/200/300'
        },
        {
            'title': 'Help with the move',
            'subTitle': 'Browse and contact local trusted tradespeople in your area.',
            'image': 'https://picsum.photos/200/300'
        }
    ]


    return (

        <View style={{}}>
            <Carousel
                loop
                width={width}
                height={Dimensions.HP_45}
                snapEnabled={true}
                // mode={'parallax'}
                // withAnimation={}
                enabled={true}
                overscrollEnabled={true}
                autoPlay={true}
                data={array}
                scrollAnimationDuration={3000}
                onSnapToItem={(index: number) => { setCurrentIndex(index) }}
                renderItem={({ item, index }) => (
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                        <Image
                            source={{ uri: item.image }}
                            // resizeMode={'contain'}
                            style={{
                                marginTop: 10,
                                height: Dimensions.HP_26,
                                width: Dimensions.WP_59,
                                // backgroundColor: 'yellow',
                                marginRight: 20,
                                // alignSelf: 'center',
                                borderRadius: 15
                            }}></Image>
                        <CustomText
                            style={{ fontSize: fontScaleNormalize(28), fontWeight: '800', marginTop: 25 }}
                        >{item.title}</CustomText>
                        <CustomText
                            // noOfLines={2}
                            style={{ fontSize: fontScaleNormalize(17), fontWeight: '400', marginTop: 10, textAlign: 'center', width: Dimensions.WP_80, }}
                        >{item.subTitle}</CustomText>
                    </View>
                )}
            />
            <PaginationComponent
                data={array}
                currentIndex={currentIndex} ></PaginationComponent >
        </View>
    )
}

export default AdvertisementList
