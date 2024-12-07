import { useState, createContext, useRef, useCallback, useEffect, useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { CurrentNetworkContext } from "../network_context";
import { styles } from "./stylesheet";
export const CurrentConfirmationPopupContext = createContext({})

export const currentConfirmationPopupEnum = {
    show: false,
    title: null,
    subTitle: null,
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    onPressOk: null,
}

const CurrentConfirmationPopup = () => {
    const [currentConfirmationPopup, setCurrentConfirmationPopup] = useState({
        show: null,
        title: null,
        subTitle: null,
        okButtonText: 'Yes',
        cancelButtonText: 'No',
        onPressOk: null,
    });

    function hideConfirmationPopup() {
        let data = { ...currentConfirmationPopupEnum }
        data.show = false
        setCurrentConfirmationPopup(data)
    }


    return {
        currentConfirmationPopup,
        setCurrentConfirmationPopup,
        hideConfirmationPopup
        // internetStatus,
        // setInternetState,
    };
};


const CurrentConfirmationPopupProvider = ({ children: any }) => {
    const store = { ...CurrentConfirmationPopup() };
    const AnimatedRef = useRef()
    const networkState = useContext(CurrentNetworkContext)


    return (
        <CurrentConfirmationPopupContext.Provider value={store}>
            <View style={{ flex: 1 }}>

                {children}
                {
                    store.currentConfirmationPopup.show &&
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, }}>
                        {/* {
                            props.cancelingTicket ?

                                <ActivityIndicator style={{ flex: 1, width: '100%' }} animating={true} size={25} color={'#B20000'}></ActivityIndicator>
                                :
                                <View style={[styles.MainWrapper, { height: !props.button ? moderateScale(170) : moderateScale(200), }]}>
                                    <TouchableOpacity style={[styles.CloseButtonStyle, {}]}
                                        onPress={() => {

                                            props.onSubmitNo()
                                        }}>
                                        <Close color={palette.white} size={moderateScale(12)}></Close>
                                    </TouchableOpacity>




                                    <Text allowFontScaling={false} style={[style.CancelTitle]}>{props.title}</Text>
                                    <Text allowFontScaling={false} style={[style.contentStyle]}>{props.text}</Text>
                                    {props.button &&
                                        <View style={[style.ButtonWrapper]}>
                                            <TouchableOpacity
                                                onPress={() => {


                                                    if (props && props.data) {
                                                        setTimeout(() => {
                                                            props.setCancelingTicket(true)
                                                            props.onSubmitYes({ office_id: props.data.id, pending: props.status },)
                                                        }, 1000);
                                                    }
                                                    else {
                                                        props.onSubmitYes()
                                                    }

                                                }}
                                                style={[style.ButtonStyle, { borderBottomLeftRadius: moderateScale(10), borderColor: '#e2e2e2', borderTopWidth: moderateScale(1) }]}>
                                                <Text allowFontScaling={false} style={[style.ButtonText]}>{t('common.Yes')}</Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    props.onSubmitNo()
                                                }}
                                                style={[style.ButtonStyle, { borderColor: '#e2e2e2', borderTopWidth: moderateScale(1), borderLeftWidth: moderateScale(1), }]}>
                                                <Text allowFontScaling={false} style={[style.ButtonText, { fontWeight: 'bold' }]}>{t('common.No')}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                        } */}
                    </View >

                }
            </View>

        </CurrentConfirmationPopupContext.Provider >
    );
};


export default CurrentConfirmationPopupProvider;