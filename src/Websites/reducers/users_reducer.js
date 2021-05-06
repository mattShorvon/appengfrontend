import { RE_USER_STATE } from "../actions/userActions";

// Matt's reducers are here. Reducers describe how actions transform the state into the next state.
const initialState = {
  isAuthenticated: Boolean,
};

// Reducer checks which action you did, then modifies the store based on this.
export const Users = (state = initialState, action) => {
  switch (action.type) {
    case RE_USER_STATE:
      console.log("pay", action.payload);
      state.isAuthenticated = action.payload;
      return state;
    default:
      return state;
  }
};

export default Users;
