const customerInitialState = {
   loading: true,
   data: [],
   oneData: {},
   errors: {},
};

const customersReducers = (state = customerInitialState, action) => {
   switch (action.type) {
      case "GET_CUSTOMERS": {
         return { ...state, data: [...action.payload] };
      }
      case "TOGGLE_LOADING": {
         return { ...state, loading: !state.loading };
      }
      case "ADD_CUSTOMER": {
         return { ...state, data: [...state.data, { ...action.payload }] };
      }
      case "ONE_CUSTOMER": {
         return { ...state, oneData: action.payload };
      }
      case "EDIT_CUSTOMER": {
         return {
            ...state,
            data: state.data.map((ele) => {
               if (ele._id === action.payload._id) {
                  return { ...action.payload };
               } else {
                  return { ...ele };
               }
            }),
         };
      }
      case "CLEAR_ONE_DATA": {
         return { ...state, oneData: {} };
      }
      case "DELETE_CUSTOMER": {
         return {
            ...state,
            data: state.data.filter((ele) => {
               return ele._id !== action.payload._id;
            }),
         };
      }
      default: {
         return { ...state };
      }
   }
};

export default customersReducers;
