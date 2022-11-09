import { hotelConstant } from "../constants";

const INITIAL_STATE = {
  hotels: {},
  from: [],
  to: [],
  flights: [],
  cars: {
    search_results:[]
  },
};

export const Hotel_Reducer = (state = INITIAL_STATE, action) => {
  
  switch (action.type) {
    case hotelConstant.GET_HOTELS:
      return {
        hotels: action.payload,
      };
    case hotelConstant.GET_FLIGHTS:
      return {
        flights: action.payload,
      };
    case hotelConstant.GET_CARS:
      return {
        cars: action.payload,
      };
    default:
      return state;
  }
};
