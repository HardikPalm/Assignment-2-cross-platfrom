import { useState, createContext, useRef, useCallback, useEffect, useContext } from "react";
import { Dimensions, Platform, StatusBar, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import Lottie from 'lottie-react-native';

import { CurrentNetworkContext } from "../network_context";
import { isIphoneX } from "react-native-iphone-x-helper";
import CustomText from "../../components/atoms/CustomText";
import { Colors } from "../../utils/colors/colors";
import { Images } from "../../utils/imageSource/imageSource";
import { connectionStatus } from "../../utils/enum/enums";
import { commonStrings } from "../../utils/constants/constants";
import { showMessage } from "react-native-flash-message";
// import { showMessage } from "react-native-flash-message";

export const CurrentErrorContext = createContext({})

export const currentErrorEnum = {
    show: false,
    errorMessage: null,
    errorTitle: null,
    success: false
}

const CurrentError = () => {
    const [currentError, setCurrentError] = useState({
        show: false,
        errorMessage: null,
        errorTitle: null,
        success: false
    });

    function hideErrorPopup() {
        let data = { ...currentErrorEnum }
        data.show = false
        data.errorMessage = null
        data.success = false
        setCurrentError(data)
    }


    return {
        currentError,
        setCurrentError,
        hideErrorPopup
        // internetStatus,
        // setInternetState,
    };
};


const CurrentErrorProvider = ({ children }) => {
    const store = { ...CurrentError() };
    const AnimatedRef = useRef()
    const networkState = useContext(CurrentNetworkContext)


    useEffect(() => {

        if (store.currentError.errorMessage && !store.currentError.success && store.currentError.show) {

            showMessage({
                message: store.currentError.errorMessage,
                type: 'danger',
                icon: 'danger'
            })

        }


    }, [store.currentError])


    return (
        <CurrentErrorContext.Provider value={store}>
            <StatusBar backgroundColor={Colors.Grey} barStyle={"light-content"}></StatusBar>
            <View style={{ flex: 1 }}>
                {
                    networkState.internetStatus == connectionStatus.HIGH ?

                        <View style={{ flex: 1 }}>
                            {children}

                        </View>
                        :
                        <View style={{
                            flex: 1, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: Colors.White
                        }}>
                            <Lottie
                                source={Images.noInternet}
                                style={[{
                                    marginTop: 25,
                                }]}
                                resizeMode={'contain'}
                                autoPlay
                                loop={true} />
                            <View style={{
                                top: Platform.OS === 'android' ? Dimensions.get('window').height * 0.02 :
                                    isIphoneX() ? Dimensions.get('window').height * 0.09 : Dimensions.get('window').height * 0.02, paddingHorizontal: 15, position: 'absolute', flex: 1, alignItems: 'center'
                            }}>
                                <CustomText style={[{
                                    fontSize: 20,
                                    fontWeight: '400',
                                    color: Colors.White
                                }]}>{commonStrings.NoInternetTitle}</CustomText>
                                <CustomText style={[{

                                    fontSize: 14,
                                    marginTop: 5,
                                    textAlign: 'center',
                                    color: 'red'
                                }]}>{commonStrings.NoInternetSubtitle}</CustomText>
                            </View>
                        </View>
                }

            </View>

        </CurrentErrorContext.Provider >
    );
};


export default CurrentErrorProvider;