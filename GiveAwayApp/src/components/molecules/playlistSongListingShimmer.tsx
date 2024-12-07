import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ShimmerPlaceHolderView from './ShimmerPlaceHolderView';
import Dimensions from '../../utils/dimension/dimensions';

const PlaylistSonglistingShimmer = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <ShimmerPlaceHolderView
        itemStyle={{
          width: 50,
          height: 50,
          borderRadius: 10,
          marginTop: 15,
        }}
        shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
      <View style={{justifyContent: 'center'}}>
        <ShimmerPlaceHolderView
          itemStyle={{
            width: '40%',
            height: Dimensions.HP_1_5,
            marginTop: 15,
            paddingLeft: Dimensions.HP_2_1,
          }}
          shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
        <ShimmerPlaceHolderView
          itemStyle={{
            width: '50%',
            marginTop: 10,
            height: Dimensions.HP_1_5,
            paddingLeft: Dimensions.HP_2_1,
          }}
          shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
      </View>
    </View>
  );
};

export default PlaylistSonglistingShimmer;

const styles = StyleSheet.create({});
