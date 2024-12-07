import NavigationService from "../../navigation/service/navigationService";
import { HttpMethods } from "../../utils/constants/constants";
import { storeToLocal } from "../../utils/storage/storage";
import { AuthUrl } from "../../utils/urls/url";
import { authAPI } from "./auth-api";

export const loginUser = async (
  reqObj: Object,
  setCallApi: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  const url = `${AuthUrl}/login`;
  // console.log(url, reqObj);
  authAPI(url, HttpMethods.Post, reqObj, ErrorContext)
    .then((res: any = {}) => {
      setCallApi(false);
      NavigationService.replace("RootStack");
      storeToLocal(res?.data?.data);
    })
    .catch((error) => {
      console.log(error);

      setCallApi(false);
    });
};

export const registerUser = async (
  reqObj: Object,
  setCallApi: Function,
  ErrorContext: any
) => {
  setCallApi(true);

  const url = `${AuthUrl}/register`;
  // console.log("hello")
  authAPI(url, HttpMethods.Post, reqObj, ErrorContext)
    .then((res: any = {}) => {
      NavigationService.replace("RootStack");
      setCallApi(false);

      storeToLocal(res?.data?.data);
    })
    .catch((error) => {
      setCallApi(false);
    });
};

