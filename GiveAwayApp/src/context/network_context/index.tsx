import { useState, createContext, useRef, useCallback, useEffect } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo'
import { connectionStatus } from "../../utils/enum/enums";



export const CurrentNetworkContext = createContext({})
const CurrentNetworkState = () => {
    const [internetStatus, setInternetState] = useState(connectionStatus.HIGH)

    let status = connectionStatus.HIGH;

    const handleNetInfoChange = (state: any) => {
        if (state.isInternetReachable === null) {
            setTimeout(() => NetInfo.fetch().then(state => handleNetInfoChange(state)), 5000);
        }
        else {
            if (!state.isInternetReachable) {
                status = connectionStatus.MISSING;
            } else if (
                state.type === 'cellular' &&
                state.details.cellularGeneration === '2g'
            ) {
                status = connectionStatus.LOW;
            }
            else {
                status = connectionStatus.HIGH;
            }
            if (status != internetStatus) {
                setInternetState(status)

            }
        }

    }
    NetInfo.configure({

        reachabilityLongTimeout: 5 * 1000, // 5s
        reachabilityShortTimeout: 5 * 1000, // 5s
        reachabilityRequestTimeout: 5 * 1000, // 5s

    });

    useEffect(() => {

        const netInfoListener = NetInfo.addEventListener(handleNetInfoChange);

        return () => {
            netInfoListener && netInfoListener();
        };
    }, [handleNetInfoChange]);
    return {
        internetStatus,
        setInternetState,

    };


};


const CurrentNetworkProvider = ({ children }) => {
    const store = { ...CurrentNetworkState() };



    return (
        <CurrentNetworkContext.Provider value={store}>
            {children}

        </CurrentNetworkContext.Provider>
    );
};


export default CurrentNetworkProvider;