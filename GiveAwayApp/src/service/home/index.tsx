import { request } from "../../service/common/request";
import { HttpMethods } from "../../utils/constants/constants";
import { Url } from "../../utils/urls/url";

export const getSearchInfo = async (
  setCallApi: Function,
  reqObj: any,
  setData: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  let url = `${Url}/playlist/search?`;
  if (reqObj?.artistId) {
    url = url + `artistId=${reqObj?.artistId}`;
  }
  if (reqObj?.search) {
    url = url + `search=${reqObj?.search}`;
  }
  request(url, HttpMethods.Get, null, ErrorContext, false)
    .then((res: any = {}) => {
      if (reqObj?.artistId) {
        setData(res?.data?.data);
      } else if (
        reqObj?.search == "" ||
        reqObj?.search == null ||
        reqObj?.search == undefined
      ) {
        let obj = {
          artists: [],
          albums: [],
          albumDetails: [],
        };
        setData(obj);
      } else {
        setData(res?.data?.data);
      }
      setCallApi(false);
    })
    .catch((error) => {
      console.log(
        "Error in Get Curated Song List:-------- 2 getSearchInfo",
        error
      );
      setCallApi(false);
    });
};

export const addProducts = async (
  reqObj: Object,
  setCallApi: Function,
  setData: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  const url = `${Url}/User/addproducts`;
  console.log("url", url);
  console.log("reqObj", reqObj);
  request(url, HttpMethods.Post, reqObj, ErrorContext)
    .then((res: any = {}) => {
      setData(res?.data);
      setCallApi(false);
      return res;
    })
    .catch((error) => {
      setCallApi(false);
    });
};

export const removesong = async (
  setCallApi: Function,
  reqObj: any,
  setData: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  // console.log(reqObj);
  const url = `${Url}/playlist/removesongsfromplaylist`;
  // console.log(url);
  request(url, HttpMethods.Put, reqObj, ErrorContext, false)
    .then((res: any = {}) => {
      // console.log("res?.data?.data", res);
      // console.log("res?.data?.data", res?.data);
      // console.log("res?.data?.data", res?.data?.data);
      setData(res?.data);
      setCallApi(false);
    })
    .catch((error) => {
      console.log("Error in removesong", error);
      // setData(error?.data);
      // setOriginalData(error?.data);
      setCallApi(false);
    });
};

export const getMyProductData = async (
  setCallApi: Function,
  setData: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  const url = `${Url}/User/getUserproducts`;
  console.log("url", url);
  try {
    let res = await request(url, HttpMethods.Get, null, ErrorContext, false);
    setData(res?.data?.data);
    setCallApi(false);
    return res?.data?.data;
  } catch (error) {
    console.log("getMyPlaylistData", error);
    setCallApi(false);
  }
};

export const getAllProductData = async (
  setCallApi: Function,
  setData: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  const url = `${Url}/User/getAllproducts`;
  console.log("url", url);
  try {
    let res = await request(url, HttpMethods.Get, null, ErrorContext, false);
    setData(res?.data?.data);
    setCallApi(false);
    return res?.data?.data;
  } catch (error) {
    console.log("getMyPlaylistData", error);
    setCallApi(false);
  }
};

export const getSearchListing = async (
  setCallApi: Function,
  reqObj: any,
  setData: Function,
  data: any,
  setTotalPages: Function,
  ErrorContext: any
) => {
  setCallApi(true);
  const url = `${Url}/playlist/search/${reqObj?.search}`;
  request(url, HttpMethods.Post, null, ErrorContext, false)
    .then((res: any = {}) => {
      if (reqObj.page == 1) {
        setTotalPages(res?.data);
        setData(res?.data);
      } else {
        var item = data.concat(res?.data);
        setData(item);
      }
      setCallApi(false);
    })
    .catch((error) => {
      console.log("Error in Get Users:-------- getSearchListing", error);
      setCallApi(false);
    });
};

export const onEndReached = (
  currentPage: number,
  totalPages: number,
  setObj: Function
) => {
  if (currentPage < totalPages) {
    setObj((prevState: any) => ({
      ...prevState,
      page: currentPage + 1,
    }));
  }
};
