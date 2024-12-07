import {Platform, Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import SearchIcon from '../../assets/svgs/SearchIcon';
import CrossIcon from '../../assets/svgs/CrossIcon';
import {Colors} from '../../utils/colors/colors';

const SearchBar = (props: any) => {
  const {
    mainStyleView,
    textInputStyle,
    placeholderText,
    placeHolderTextColor,
    secondViewStyle,
    firstIconStyle,
    crossIconViewStyle,
  } = props;
  const [value, setValue] = useState('');
  return (
    <View style={[styles.mainView, {...mainStyleView}]}>
      <View style={[styles.secondView, {...secondViewStyle}]}>
        <View style={[styles.firstIcon, {...firstIconStyle}]}>
          <SearchIcon fill={Colors.White} />
        </View>
        <TextInput
          secureTextEntry={false}
          editable={true}
          value={value}
          style={[styles.textInputStyle, {...textInputStyle}]}
          placeholder={placeholderText}
          placeholderTextColor={placeHolderTextColor}
          keyboardType={'default'}
          returnKeyType={'default'}
          onChangeText={text => {
            setValue(text);
            props.onChangeText(text);
          }}></TextInput>
      </View>
      <Pressable
        style={[{...crossIconViewStyle}]}
        onPress={() => {
          setValue('');
          props?.onCrossIconPress();
        }}>
        <CrossIcon />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? Dimensions.HP_2_1 : 0,
    width: '100%',
  },
  textInputStyle: {},
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstIcon: {},
});
