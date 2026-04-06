export const initialStore = () => {
  return {
    token: "",
    userAuth: false,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_TOKEN":
      return {
        ...store,
        token: action.payload,
      };
    case "ADD_LOGIN_STATUS":
      return {
        ...store,
        userAuth: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...store,
        token: "",
        userAuth: false
      };
    default:
      throw Error("Unknown action.");
  }
}
