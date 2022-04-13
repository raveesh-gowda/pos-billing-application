const userInitialState = {
   user: {},
};

const userReducers = (state = userInitialState, action) => {
   switch (action.type) {
      case "REGISTER_USER": {
         return { ...state, user: { ...action.payload } };
      }
      case "LOGIN_USER": {
         return { ...state, user: { ...action.payload } };
      }
      case "USER_INFO": {
         return { ...state, user: { ...action.payload } };
      }
      case "USER_LOGOUT": {
         return { ...state, user: {} };
      }
      default: {
         return { ...state };
      }
   }
};

export default userReducers;
