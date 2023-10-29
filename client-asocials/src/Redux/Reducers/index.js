import { combineReducers } from "redux";
import Post from "./Posts"
import Auth from "./Auth"
import Users from "./Users"

export default combineReducers({Auth,Post})