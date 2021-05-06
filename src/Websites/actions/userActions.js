export const RE_USER_STATE = "RE_USER_STATE";

// Matt's actions are here. Actions are just descriptions of what you want to do.
export function ReUserState(authState) {
  const action = {
    type: RE_USER_STATE,
    payload: authState,
  };
  return action;
}
