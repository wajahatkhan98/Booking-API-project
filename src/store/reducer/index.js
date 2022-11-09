import {combineReducers} from 'redux';
import { Auth_Reducer } from './auth.reducer';
import { User_Reducer } from './user.reducer';
import { Hotel_Reducer } from './hotelFlight.reducer';
const rootReducer = combineReducers({Auth_Reducer,User_Reducer,Hotel_Reducer});
export default rootReducer;