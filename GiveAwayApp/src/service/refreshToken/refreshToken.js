import axios from "axios";
import { autoLogout, logout } from "../../utils/functions/commanFunctions";
import { AsyncKey, Storage } from "../../utils/storage/storage";
import { Url } from "../../utils/urls/url";


let isRefreshing = false;
let refreshSubscribers: Array<string> = [];

export const axiosApiInstance = axios.create();

// function subscribeTokenRefresh(cb) {

//     refreshSubscribers.push(cb);

// }



function onRefreshed(token: string) {
    refreshSubscribers.map(cb => cb(token));
}


axiosApiInstance.interceptors.request.use(
    async request => {


        if (Storage.contains(AsyncKey.AccessToken)) {
            var accessToken = Storage.getString(AsyncKey.AccessToken)
            request.headers.Authorization = `Bearer ${accessToken}`
        }

        return request;

    },
    err => {
        return Promise.reject(err);
    },
)

axiosApiInstance.interceptors.response.use(
    response => {
        return response

    },
    async error => {
        console.warn("main error is here", error);
        const { config, response: { status } } = error
        const originalRequest = config

        if (status == 401) {
            console.warn("isRefreshing value", isRefreshing);
            if (!isRefreshing) {

                isRefreshing = true
                let tokenRefershResponse = await callNewAccessToken()

                if (tokenRefershResponse && tokenRefershResponse.data && tokenRefershResponse.status == 200) {

                    isRefreshing = false
                    let accessToken = tokenRefershResponse.data.accessToken
                    onRefreshed(accessToken)
                    Storage.set(AsyncKey.AccessToken, accessToken)
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    return axiosApiInstance(originalRequest)

                }
            }
            // return new Promise((resolve) => {

            //     subscribeTokenRefresh((token) => {
            //         originalRequest.headers['Authorization'] = `Bearer ${token}`;
            //         console.warn("original request", originalRequest);
            //         resolve(axiosApiInstance(originalRequest))
            //     })
            // }).catch((error) => { console.warn("catching error", error); })
        } else {

            return Promise.reject(error);
        }
    })





async function callNewAccessToken() {

    // var refreshToken = await AsyncStorage.getItem(AsyncKey.RefreshToken)
    var accessToken = Storage.getString(AsyncKey.AccessToken)
    return axios(
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            url: `${Url}/tokens/refresh`,

        }

    ).catch((error) => {
        console.warn("error coming in refreshToken", error);
        autoLogout()
    })

}


