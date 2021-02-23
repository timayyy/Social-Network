import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from "./reducers/userReducers";
// import {
//   leaveRequestListReducer,
//   leaveRequestListMyReducer,
//   leaveRequestCreateReducer,
//   leaveRequestDetailsReducer,
//   leaveRequestUpdateReducer,
//   leaveRequestDeleteReducer,
//   leaveRequestApproveReducer,
//   leaveRequestRejectReducer
// } from "./reducers/leaveRequestReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("lmUserInfo")
  ? JSON.parse(localStorage.getItem("devconUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
