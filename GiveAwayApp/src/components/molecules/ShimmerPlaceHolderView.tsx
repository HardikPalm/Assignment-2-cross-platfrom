import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder, {
  createShimmerPlaceholder,
} from 'react-native-shimmer-placeholder';
import Dimensions from '../../utils/dimension/dimensions';
import {Skeleton} from '@rneui/themed';

const ShimmerPlaceHolderView = (props: any) => {
  // const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  const {itemStyle, shimmerStyle} = props;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          overflow: 'hidden',
          // width: Dimensions.WP_32,
          // aspectRatio: 1,
          // // height: Platform.OS == 'ios' ? Dimensions.HP_22 : Dimensions.HP_23,
          // borderRadius: 10,
          // marginLeft: 15,
          // marginVertical: 10
        },
        itemStyle,
      ]}>
      <ShimmerPlaceholder
        shimmerColors={['#dddddd', '#c6c6c6', '#dddddd']}
        isInteraction={false}
        duration={1000}
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            // flexGrow: 1,
            // borderRadius: 10
            // height: Dimensions.HP_31,
          },
          shimmerStyle,
        ]}
        LinearGradient={LinearGradient}
      />
      <Skeleton
        style={[
          {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            // flexGrow: 1,
            // borderRadius: 10
            // height: Dimensions.HP_31,
          },
          shimmerStyle,
        ]}
      />
      {/* <Skeleton circle width={40} height={40} /> */}
    </View>
  );
};

export default memo(ShimmerPlaceHolderView);
