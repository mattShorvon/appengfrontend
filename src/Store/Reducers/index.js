import { combineReducers } from "redux";

import Users from "../../Websites/reducers/users_reducer";

const rootReducer = combineReducers({
  Users,
});

export default rootReducer;
