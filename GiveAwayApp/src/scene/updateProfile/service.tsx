import NavigationService from "../../navigation/service/navigationService"
import { request } from "../../service/common/request"
import { HttpMethods } from "../../utils/constants/constants"
import { AsyncKey, Storage } from "../../utils/storage/storage"
import { Url } from "../../utils/urls/url"

export const updateProfile = async (setCallApi: Function, reqObj: any, id: string, ErrorContext: any) => {
    setCallApi(true)
    const url = `${Url}/User/update/${id}`
    request(url, HttpMethods.Put, reqObj, ErrorContext, true).then((res: any = {}) => {
        setCallApi(false)
        Storage.set(AsyncKey.UserData, JSON.stringify(res.data.result))
        NavigationService.goBack()
    }).catch((error) => {
        console.log(`============error==============`)
        console.log(error);
        console.log(`============error==============`)
        setCallApi(false)
    })
}

export const removeproduct = async (setCallApi: Function, reqObj: any, ErrorContext: any) => {
    setCallApi(true)
    const url = `${Url}/User/removeProduct`
    request(url, HttpMethods.Put, reqObj, ErrorContext, true).then((res: any = {}) => {
        setCallApi(false)
        Storage.set(AsyncKey.UserData, JSON.stringify(res.data.result))
        NavigationService.goBack()
    }).catch((error) => {
        console.log(`============error==============`)
        console.log(error);
        console.log(`============error==============`)
        setCallApi(false)
    })
}