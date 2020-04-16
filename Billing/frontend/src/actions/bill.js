import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_bill_DATA, DELETE_ONE_bill, UPDATE_ONE_bill, ADD_ONE_bill, SET_EDIT_bill, SET_EDIT_bill_CLUSTER } from "./types";

// GET bill DATA
export const getbill = () => (dispatch, getState) => {
  axios
    .get("/api/bill/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_bill_DATA,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE one bill
export const deleteOnebill = id => (dispatch, getState) => {
  axios
    .delete(`/api/bill/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteOnebill: "bill Deleted" }));
      dispatch({
        type: DELETE_ONE_bill,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

export const setEditedbill = bill => (dispatch, getState) => {
  console.log("setEditedbill called");
  dispatch({
    type: SET_EDIT_bill,
    payload: bill
  })
}


export const setbillCluster = billCluster => (dispatch, getState) => {
  console.log("setbillCluster called");
  dispatch({
    type: SET_EDIT_bill_CLUSTER,
    payload: billCluster
  })
}


// UPDATE one bill
export const updateOnebill = bill => (dispatch, getState) => {
  axios
    .put(`/api/bill/${bill.id}/`, bill, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateOnebill: "bill Updated" }));
      dispatch({
        type: UPDATE_ONE_bill,
        payload: bill
      });
    })
    .catch(err => console.log(err));
};

// ADD one bill
export const addOnebill = bill => (dispatch, getState) => {
  axios
    .post("/api/bill/", bill, tokenConfig(getState))
    .then(res => {
      console.log("add one bill success", res.data);

      dispatch(createMessage({ addOnebill: "bill Added" }));
      
      dispatch({
        type: ADD_ONE_bill,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
