import {
    Alert,
    Dimensions
} from 'react-native';
import * as _ from 'lodash';
import { showMessage } from 'react-native-flash-message';
import { MessageType } from '../enum/enums';
// import NavigationService from '../../navigation/service/navigationService';
import moment from 'moment';
import { Storage } from '../storage/storage';
import NavigationService from '../../navigation/service/navigationService';


const { width, fontScale, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const defaultScaleFactor = width < guidelineBaseWidth ? 0.5 : 1;
const scale = (size: any) => (width / guidelineBaseWidth) * size;


export const fontScaleNormalize = _.memoize(
    (size: number, factor: number = defaultScaleFactor) =>
        fontScale > 1.4
            ? ((size + (scale(size) - size) * factor) / fontScale) * 1.353
            : size + (scale(size) - size) * factor,
);

export const showToastMessage = (message: string, type = MessageType.Error, duration = 2000) => {
    showMessage({
        type: type,
        icon: type,
        message: message,
        autoHide: true,
        duration: duration
    })
}

export const objectToQueryString = (obj: any) => {
    const QueryString = Object.keys(obj)
        // eslint-disable-next-line func-names
        .map(function (key) {
            return `${key}=${obj[key]}`;
        })
        .join('&');

    return QueryString;
};

export const datecheck = (obj: any) => {
    console.log("obj", obj)
    if (!(obj instanceof Date)) {
        throw new Error('Input is not a Date object');
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const objMonth = obj.getMonth();
    const objDate = obj.getDate();
    console.log("objMonth === currentMonth && objDate >= 1 && objDate <= 3", objMonth === currentMonth && objDate >= 1 && objDate <= 3)
    return objMonth === currentMonth && objDate >= 1 && objDate <= 3;
};

export function resetStack() {

    NavigationService.reset('AuthStack', 0)

}


// export function countHours(startTime, endTime) {

//     var duration = moment.duration(moment(endTime).diff(moment(startTime)),);
//     var hoursTime = duration.asHours();
//     hoursTime = Math.floor(hoursTime)
//     return hoursTime
// }

export function logout() {

    Alert.alert("Log out", "Are you sure you want to log out?", [
        {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        {
            text: "Yes", onPress: () => {

                Storage.clearAll()
                resetStack()

            }
        }
    ])
}

