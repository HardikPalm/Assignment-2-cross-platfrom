import axios from "axios";
import { currentErrorEnum } from "../../context/error_message_context";
import { HttpMethods } from "../../utils/constants/constants";
import { MessageType } from "../../utils/enum/enums";
import { showToastMessage } from "../../utils/functions/commanFunctions";

export const authAPI = (
  url: string,
  method: HttpMethods,
  req: Object,
  ErrorContext: any
) => {
  return new Promise((resolve, reject) => {
    let data = { ...currentErrorEnum };

    axios({
      method: method,
      url: url,
      data: req,
    })
      .catch((error) => {
        console.log(error);

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
      .then((result) => {
        if (
          result?.data?.statusCode == 201 ||
          result?.data?.statusCode == 200
        ) {
          data.errorMessage = result.data.message;
          data.show = true;
          data.success = true;
          ErrorContext.setCurrentError(data);
          showToastMessage(result.data.message, MessageType.Success);
          resolve(result);
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
