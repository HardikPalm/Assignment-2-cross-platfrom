import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';

const ListEmptyCurated = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CustomText style={{marginTop: 10, color: 'grey'}}>
        There is no Curated List
      </CustomText>
    </View>
  );
};

export default ListEmptyCurated;

const styles = StyleSheet.create({});
