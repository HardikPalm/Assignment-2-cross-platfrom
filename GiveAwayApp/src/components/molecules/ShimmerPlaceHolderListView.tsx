import React, {memo, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import ShimmerPlaceHolderView from './ShimmerPlaceHolderView';
import {any} from 'prop-types';

const ShimmerPlaceHolderListView = ({
  itemStyle = {},
  totalNumber = 8,
  numColumns = 0,
  horizontal = false,
  flatlistStyle = {},
  //@ts-ignore
  renderItem,
  ContainerStyle = {},
  ...otherProps
}) => {
  return (
    <View>
      <FlatList
        {...otherProps}
        scrollEnabled={false}
        style={[{paddingVertical: 10}, flatlistStyle]}
        contentContainerStyle={[
          {
            marginStart: 0,
            marginEnd: 25,
            marginRight: 25,
            columnGap: 15,
          },
          ContainerStyle,
        ]}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[...new Array(totalNumber).keys()]}
        numColumns={numColumns}
        renderItem={renderItem}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        // renderItem={() => {
        //   return (
        //     <ShimmerPlaceHolderView
        //       itemStyle={itemStyle}></ShimmerPlaceHolderView>
        //   );
        // }}
      ></FlatList>
    </View>
  );
};

export default memo(ShimmerPlaceHolderListView);
