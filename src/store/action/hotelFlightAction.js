import { hotelService } from "../../services/hotelFlightService";
import { hotelConstant } from "../constants";
const searchHotel = (data, navigate, setLoading) => {
  return (dispatch) => {
    hotelService
      .searchHotel(data)
      .then((res) => {
        
        dispatch({ type: hotelConstant.GET_HOTELS, payload: res });
        setLoading(false);
        localStorage.setItem("hotels", JSON.stringify(res));
        navigate && navigate("/hotels", { state: { ...data } });
      })
      .catch((err) => {
        
      });
  };
};
const searchLocation = ({ locale, name }, setCities, setShow) => {
  return (dispatch) =>
    hotelService
      .searchLocations({ locale, name })
      .then((data) => {
        if (data && data.length > 0) {
          setCities(data);
          setShow(true);
        }
        
      })
      .catch((err) => {
        
      });
};
const searchAirport = (name, setAirport, from, showList) => {
  
  return (dispatch) =>
    hotelService
      .searchAirport(name)
      .then((data) => {
        
        if (data && data.length > 0) {
          from
            ? setAirport((pre) => ({ ...pre, from: data }))
            : setAirport((pre) => ({ ...pre, to: data }));
          from
            ? showList((pre) => ({ ...pre, from: true }))
            : showList((pre) => ({ ...pre, to: true }));
        }
      })
      .catch((err) => {
        
      });
};
const searchLocationLatLong = (address, setState, isFrom, showList) => {
  return (dispatch) =>
    hotelService
      .searchLocation(address)
      .then((data) => {
        
        if (isFrom) {
          setState((prev) => ({ ...prev, from: data?.results }));
          showList((pre) => ({ ...pre, from: true }));
        } else {
          
          setState((prev) => ({ ...prev, to: data?.results }));
          showList((pre) => ({ ...pre, to: true }));
        }
      })
      .catch((err) => {
        
      });
};
const hotelPictures = (hotel_id, setPhotos) => {
  return (dispatch) =>
    hotelService
      .hotelPhotos(hotel_id)
      .then((res) => {
        setPhotos(res);
      })
      .catch((err) => {
        
      });
};
const hotelDiscription = (hotel_id, setPhotos) => {
  return (dispatch) =>
    hotelService
      .hotelDiscription(hotel_id)
      .then((res) => {
        setPhotos(res);
      })
      .catch((err) => {
        
      });
};
const hotelQuestions = (hotel_id, setPhotos) => {
  return (dispatch) =>
    hotelService
      .hotelQuestions(hotel_id)
      .then((res) => {
        setPhotos(res);
      })
      .catch((err) => {
        
      });
};
const searchFlights = (
  origin,
  destination,
  departure_at,
  return_at,
  setLoading
) => {
  return (dispatch) =>
    hotelService
      .searchFlights(origin, destination, departure_at, return_at)
      .then((res) => {
        
        setLoading(false);
        dispatch({ type: hotelConstant.GET_FLIGHTS, payload: res?.data?.data });
        localStorage.setItem("flights", res?.data?.data);
      })
      .catch((err) => {
        
      });
};
const searchCars = (
  drop_off_longitude,
  drop_off_latitude,
  drop_off_datetime,
  pick_up_longitude,
  pick_up_latitude,
  pick_up_datetime
) => {
  return (dispatch) =>
    hotelService
      .searchCars(
        drop_off_longitude,
        drop_off_latitude,
        drop_off_datetime,
        pick_up_longitude,
        pick_up_latitude,
        pick_up_datetime
      )
      .then((res) => {
        
        dispatch({ type: hotelConstant.GET_CARS, payload: res });
        localStorage.setItem("cars", res);
      })
      .catch((err) => {
        
      });
};
export const hotelAction = {
  searchLocation,
  searchHotel,
  searchAirport,
  searchLocationLatLong,
  searchFlights,
  hotelPictures,
  hotelDiscription,
  hotelQuestions,
  searchCars,
};
