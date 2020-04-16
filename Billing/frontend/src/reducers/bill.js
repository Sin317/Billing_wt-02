import { GET_bill_DATA, DELETE_ONE_bill, SET_EDIT_bill, UPDATE_ONE_bill, ADD_ONE_bill, CLEAR_bill_DATA, SET_EDIT_bill_CLUSTER } from "../actions/types.js";

const initialState = {
  bill: [],
  editedbill: {
    expenditure: "",
    salary: "",
    pay_month: "",
    due_month: "",
    category: ""
  },
  billCluster: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_bill_DATA:
      return {
        ...state,
        bill: action.payload
      };
    case DELETE_ONE_bill:
      return {
        ...state,
        bill: state.bill.filter(one_bill => one_bill.id !== action.payload)
      };
    case SET_EDIT_bill:
      console.log("in reducer SET_EDIT_bill is called");
      return {
        ...state,
        editedbill: action.payload
      };
    case SET_EDIT_bill_CLUSTER:
      console.log("in reducer SET_EDIT_bill_CLUSTER is called");
      console.log(action.payload)
      return {
        ...state,
        billCluster: action.payload
      };
    case UPDATE_ONE_bill:
      return {
        ...state,
        bill: state.bill.map(one_bill => {
                  if ( one_bill.id !== action.payload.id ) {
                    return one_bill;
                  } else {
                    return action.payload;
                  }
                })
      };
    case ADD_ONE_bill:
      return {
        ...state,
        bill: [...state.bill, action.payload]
      };
    case CLEAR_bill_DATA:
      return {
        ...state,
        bill: []
      };
    default:
      return state;
  }
}
