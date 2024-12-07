import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ShimmerPlaceHolderView from './ShimmerPlaceHolderView';
import Dimensions from '../../utils/dimension/dimensions';

const SongListingShimmerView = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <ShimmerPlaceHolderView
        itemStyle={{
          width: 80,
          height: 80,
          borderRadius: 10,
          marginTop: 15,
        }}
        shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
      <View style={{justifyContent: 'center'}}>
        <ShimmerPlaceHolderView
          itemStyle={{
            width: '40%',
            height: Dimensions.HP_2_1,
            marginTop: 15,
            paddingLeft: Dimensions.HP_2_1,
          }}
          shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
        <ShimmerPlaceHolderView
          itemStyle={{
            width: '50%',
            marginTop: 10,
            height: Dimensions.HP_2_1,
            paddingLeft: Dimensions.HP_2_1,
          }}
          shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
      </View>
    </View>
  );
};

export default SongListingShimmerView;

const styles = StyleSheet.create({});
