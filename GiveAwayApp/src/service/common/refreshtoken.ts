import axios from 'axios';

import { resetStack } from '../../utils/functions/commanFunctions';
import { AsyncKey, Storage } from '../../utils/storage/storage';
import { Url } from '../../utils/urls/url';

export async function refreshTokenAPI(
  url: string,
  ErrorContext: any,
  method: any,
  setCallingAPI: Function,
  req: any,
) {
  let refreshToken = Storage.getString(AsyncKey.RefreshToken)

  const result = await axios({
    method: 'POST',
    url: `${Url}/auth/v1/refreshtoken`,
    data: {
      refreshToken: refreshToken,
    },
  }).catch(error => {
    return error.response;
  });

  if (result?.statusCode == 201 || result?.statusCode == 200) {
    Storage.set(
      AsyncKey.AccessToken,
      JSON.stringify(result?.result?.accessToken),
    );
    Storage.set(
      AsyncKey.RefreshToken,
      JSON.stringify(result?.result?.refreshToken),
    );

    return { result };
  } else {
    Storage.clearAll();
    resetStack()
  }
  return { ...result.data };
}
