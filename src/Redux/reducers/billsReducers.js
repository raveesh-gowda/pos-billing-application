const billsInitialState = {
   data: [],
};

const billsReducers = (state = billsInitialState, action) => {
   switch (action.type) {
      case "GET_BILLS": {
         return { ...state, data: [...action.payload] };
      }
      case "POST_BILLS": {
         return { ...state, data: [{ ...action.payload }, ...state.data] };
      }
      case "DELETE_BILL": {
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

export default billsReducers;
