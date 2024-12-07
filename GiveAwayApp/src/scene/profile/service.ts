import NavigationService from "../../navigation/service/navigationService"
import { request } from "../../service/common/request"
import { HttpMethods } from "../../utils/constants/constants"
import { AsyncKey, Storage } from "../../utils/storage/storage"
import { Url } from "../../utils/urls/url"

export const deleteUser = async (setCallApi: Function, id: string, ErrorContext: any) => {
    setCallApi(true)
    const url = `${Url}/User/delete/${id}`
    return new Promise(async (resolve, reject) => {
        request(url, HttpMethods.Delete, {}, ErrorContext, true).then((res: any = {}) => {
            setCallApi(false)
            resolve(true)
        }).catch((error) => {
            console.log(`============error==============`)
            console.log(error);
            console.log(`============error==============`)
            reject(false)
            setCallApi(false)
        })
    })
}