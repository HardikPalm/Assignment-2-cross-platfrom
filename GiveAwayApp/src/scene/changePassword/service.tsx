import NavigationService from '../../navigation/service/navigationService';
import {request} from '../../service/common/request';
import {HttpMethods} from '../../utils/constants/constants';
import {AsyncKey, Storage} from '../../utils/storage/storage';
import {Url} from '../../utils/urls/url';

export const changePassword = async (
  setCallApi: Function,
  reqObj: any,
  ErrorContext: any,
) => {
  setCallApi(true);
  const url = `${Url}/User/changepassword`;
  request(url, HttpMethods.Post, reqObj, ErrorContext, true)
    .then((res: any = {}) => {
      setCallApi(false);
      NavigationService.goBack();
    })
    .catch(error => {
      console.log(`============error==============`);
      console.log(error);
      console.log(`============error==============`);
      setCallApi(false);
    });
};
