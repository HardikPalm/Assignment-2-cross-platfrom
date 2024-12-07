import axios from "axios";
import { currentErrorEnum } from "../../context/error_message_context";
import { MessageType } from "../../utils/enum/enums";
import {
  resetStack,
  showToastMessage,
} from "../../utils/functions/commanFunctions";
import { AsyncKey, Storage } from "../../utils/storage/storage";

export const request = async (
  url,
  method,
  req,
  ErrorContext,
  showToast = true
) => {
  return new Promise(async (resolve, reject) => {
    let data = { ...currentErrorEnum };
    // console.log(data)
    let accessToken = Storage.getString(AsyncKey.AccessToken);

    axios({
      method: method,
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: method
        ? method == "GET" || method == "DELETE"
          ? undefined
          : req
        : null,
    })
      .catch((error) => {
        console.log(`============error==============`);
        console.log(error);
        console.log(`============error==============`);
        var message = "";
        if (typeof error?.response?.data?.message == "object") {
          var errorData = error.response.data.message;
          var keys = Object.keys(error?.response?.data?.message);
          if (keys.length > 0 && errorData[keys[0]].length > 0) {
            data.errorMessage = errorData[keys[0]];
            data.show = true;
            data.success = false;
            ErrorContext.setCurrentError(data);
          }
        } else {
          data.errorMessage = error?.response?.data?.message;
          data.show = true;
          data.success = false;
          ErrorContext.setCurrentError(data);
        }

        reject(error.response);
      })
      .then(async (result) => {
        if (
          result?.data?.statusCode == 201 ||
          result?.data?.statusCode == 200
        ) {
          data.errorMessage = result.data.message;
          data.show = true;
          data.success = true;
          ErrorContext.setCurrentError(data);
          if (showToast) {
            showToastMessage(result.data.message, MessageType.Success);
          }
          resolve(result);
        } else if (result?.data?.statusCode == 401) {
          let refreshTokenAPIresult = await refreshTokenAPI();
          if (
            refreshTokenAPIresult?.data?.statusCode == 201 ||
            refreshTokenAPIresult?.data?.statusCode == 200
          ) {
            return request(url, method, ErrorContext, setCallingAPI, req);
          }
        } else {
          if (typeof result?.data?.message == "string") {
            data.errorMessage = result?.data?.message;
            data.show = true;
            data.success = false;
            ErrorContext.setCurrentError(data);
            reject(result?.data?.message);
          }
        }
      });
  });
};
