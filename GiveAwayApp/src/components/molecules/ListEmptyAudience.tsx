import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';

const ListEmptyAudience = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CustomText style={{marginTop: 10, color: 'grey'}}>
        There is no Audience List
      </CustomText>
    </View>
  );
};

export default ListEmptyAudience;

const styles = StyleSheet.create({});
