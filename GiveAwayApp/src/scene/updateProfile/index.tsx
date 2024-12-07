import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import CustomTextInput from '../../components/atoms/CustomTextInput'
import { Colors } from '../../utils/colors/colors'
import Dimensions from '../../utils/dimension/dimensions'
import { Strings } from './strings'
import { Constants } from '../../utils/constants/constants'
import { Fonts } from '../../utils/fonts/fonts'
import { AsyncKey, Storage } from '../../utils/storage/storage'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/atoms/CustomButton'
import { CurrentErrorContext } from '../../context/error_message_context'
import { updateProfile } from './service'

const UpdateProfile = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState('')


    const ErrorContext = useContext(CurrentErrorContext)

    useFocusEffect(
        useCallback(() => {

            if (Storage.contains('UserData')) {
                var userData: any = Storage.getString(AsyncKey.UserData)
                userData = JSON.parse(userData)
                setFirstName(userData?.fullName.split(" ")[0])
                setLastName(userData?.fullName.split(" ")[1])
                setUserId(userData?.userId)

            }

        }, [])
    )



    const [objectError, setObjectError] = useState({
        firstName: false,
        lastName: false,
    })

    function isValid() {



        if (firstName.length == 0) {
            setObjectError(prevState => ({
                ...prevState,
                firstName: true
            }))

            return false
        }
        else if (lastName.length == 0) {
            setObjectError(prevState => ({
                ...prevState,
                lastName: true
            }))

            return false
        }

        return true

    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.Black, paddingTop: 25 }}>
            <View style={{ flex: 1 }}>
                <CustomTextInput
                    mainStyle={[styles.textInputStyle]}
                    placeHolder={Strings.firstName}
                    value={firstName}
                    placeHolderTextColor={Colors.Grey}
                    titleStyle={{ color: Colors.Green }}
                    Label={Strings.firstName}
                    textInputStyle={styles.mainTextInputStyle}
                    hasError={objectError.firstName}
                    onChangeText={(text: string) => {
                        setFirstName(text)
                        if (objectError.firstName) {

                            setObjectError(prevState => ({
                                ...prevState,
                                firstName: false
                            }))
                        }
                    }}
                ></CustomTextInput>
                <CustomTextInput
                    mainStyle={styles.textInputStyle}
                    value={lastName}
                    titleStyle={{ color: Colors.Green, marginTop: 15 }}
                    Label={Strings.lastName}
                    placeHolder={Strings.lastName}
                    placeHolderTextColor={Colors.Grey}
                    textInputStyle={styles.mainTextInputStyle}
                    hasError={objectError.lastName}
                    onChangeText={(text: string) => {
                        setLastName(text)
                        if (objectError.lastName) {

                            setObjectError(prevState => ({
                                ...prevState,
                                lastName: false
                            }))
                        }
                    }}
                ></CustomTextInput>
            </View>
            <CustomButton
                title={'Update'}
                style={styles.buttonStyle}
                loading={loading}
                onPress={() => {

                    if (isValid()) {
                        var obj: any = {}
                        obj['fullName'] = firstName + " " + lastName
                        updateProfile(setLoading, obj, userId, ErrorContext)
                        // registerUser(obj, setLoading, ErrorContext)
                    }
                }}
            ></CustomButton>
        </View>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({
    primary: {

        backgroundColor: Colors.Black,
        paddingTop: Dimensions.HP_10,
        paddingHorizontal: 20,
        paddingBottom: 20

    },
    titleStyle: {
        fontSize: 30,
        color: Colors.Green,
        alignSelf: 'center',
        fontFamily: Fonts.Bold,
    },
    subTitleStyle: {
        fontSize: 18,
        color: Colors.White,
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 14
    },
    textInputStyle: {
        backgroundColor: Colors.Black_10,
        // width: Dimensions.WP_80,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15

    },
    mainTextInputStyle: {
        color: Colors.Grey
    },
    buttonStyle: {
        backgroundColor: Colors.Green,
        width: Dimensions.WP_50,
        marginBottom: Dimensions.HP_6,
        alignSelf: 'center'
    }

})