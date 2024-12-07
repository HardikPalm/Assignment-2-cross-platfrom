import React, { useEffect, useState } from 'react';

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
import { Fonts } from '../../assets/fonts/fonts';
import { Colors } from '../../utils/colors/colors';
import { decimalRegex } from '../../utils/constants/constants';
import Dimensions from '../../utils/dimension/dimensions';
import { fontScaleNormalize } from '../../utils/functions/commanFunctions';
import { Images } from '../../utils/imageSource/imageSource';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
import CustomTextInput from '../atoms/CustomTextInput';
import ModalView from './ModalView';


const ApplyModalView = (props) => {

    const {
        title = '',
        visible = false,
        textInputLabel = '',
        onModalClose,
        maxLength = 4,
    } = props

    const [value, setValue] = useState('')
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {

        if (value.length == 0 || value == 0) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }

    }, [value])

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    function isValid() {

        if (!value.includes('.') && value.length > maxLength) {
            setError(true)
            setErrorMessage(`only ${maxLength} digits allowed`)
            return false
        }
        else if (value.includes('.')) {
            var result = decimalRegex.test(value)
            if (!result) {
                setError(true)
                setErrorMessage('Only two digits are allowed after the decimal point')
                return false
            }
            else if (value.length > Number(maxLength) + 3) {
                setError(true)
                setErrorMessage(`With decimals only ${maxLength + 3} digits allowed`)
                return false
            }
        }

        return true
    }

    return (
        <ModalView
            onModalClose={onModalClose}
            // style={{ height: Dimensions.HP_24, backgroundColor: 'red' }}
            mainStyle={{ paddingHorizontal: 25, backGroundColor: Colors.White }}
            isVisible={visible}
        >
            <View style={{ paddingHorizontal: 30, paddingVertical: 30, backgroundColor: Colors.White, borderRadius: 15 }}>
                <CustomText

                    style={{
                        fontSize: fontScaleNormalize(18),
                        fontFamily: Fonts.Bold,
                        alignSelf: 'center'
                    }}>{title}</CustomText>
                <CustomTextInput
                    keyboardType={'numeric'}
                    value={value.toString()}
                    Label={textInputLabel}
                    hasError={error}
                    // maxLength={maxLength}
                    errorMessage={errorMessage}
                    onChangeText={(text) => {
                        if (error) {
                            setError(false)
                        }
                        setValue(text)

                    }}
                ></CustomTextInput>
                <View style={{ flexDirection: 'row', columnGap: 10, marginTop: 30 }}>
                    <CustomButton
                        title={'Cancel'}
                        onPress={() => {
                            onModalClose()
                        }}
                        style={[styles.buttonStyle, {
                            backgroundColor: Colors.White,
                            borderColor: Colors.InActiveTabBarColor,
                        }]}
                        textStyle={{
                            color: Colors.InActiveTabBarColor
                        }}
                    ></CustomButton>
                    <CustomButton
                        title={'Submit'}
                        disabled={disabled}
                        onPress={() => {



                            if (isValid()) {
                                props.onSubmitPress(value)
                            }




                        }}
                        style={[styles.buttonStyle, {
                            backgroundColor: disabled ? Colors.Grey : Colors.White,
                            borderColor: disabled ? Colors.Grey : Colors.AppThemeBlue,
                        }]}
                        textStyle={{
                            color: disabled ? Colors.White : Colors.AppThemeBlue
                        }}
                    ></CustomButton>

                </View>
            </View>
            <TouchableOpacity
                onPress={onModalClose}
                style={{
                    position: 'absolute',
                    backgroundColor: Colors.TextInputBorderColors,
                    top: -Dimensions.WP_5_5,
                    width: Dimensions.WP_11,
                    aspectRatio: 1,
                    borderRadius: Dimensions.WP_11,
                    right: Dimensions.WP_7,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Image style={{ width: Dimensions.WP_8, height: Dimensions.WP_8, aspectRatio: 1 }} resizeMode={'contain'} source={Images.Close}></Image>
            </TouchableOpacity>

        </ModalView>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth: 1,
        width: Dimensions.WP_35,
        height: Dimensions.HP_5
    }
})

export default ApplyModalView