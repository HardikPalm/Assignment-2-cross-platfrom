import { MMKV } from "react-native-mmkv"

export const AsyncKey = {

    AccessToken: 'AccessToken',
    RefreshToken: 'RefreshToken',
    UserData: 'UserData',
    UserId: "UserId",
}

export const Storage = new MMKV()

export function storeToLocal(data: any) {

    try {
        if (data?.accessToken) {
            Storage.set(AsyncKey.AccessToken, data.accessToken)
        }
        else if (data?.accesToken) {
            Storage.set(AsyncKey.AccessToken, data.accesToken)
        }

        Storage.set(AsyncKey.RefreshToken, data.refreshToken)
        Storage.set(AsyncKey.UserId, JSON.stringify(data.userId))
        Storage.set(AsyncKey.UserData, JSON.stringify(data))
    }
    catch (error) {

    }
}