import { FIND_WEBSITE_NAME } from "../constants/homeConstant";

export const findWebsiteName = (data) => async (dispatch, getState) => {
  dispatch({
    type: FIND_WEBSITE_NAME,
    payload: data,
  });
};
