import { FIND_WEBSITE_NAME } from "../constants/homeConstant";

export const homeReducer = (state = { businessName: "" }, action) => {
  switch (action.type) {
    case FIND_WEBSITE_NAME:
      return { businessName: action.payload };
    default:
      return state;
  }
};
