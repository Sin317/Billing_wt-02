import { combineReducers } from "redux";
import bill from "./bill";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  bill,
  errors,
  messages,
  auth
});
