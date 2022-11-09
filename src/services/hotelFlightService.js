import { API } from "../config/api";
import axios from "axios";
const searchHotel = (param) => {
  param?.children_number < 1 && delete param.children_number;
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
    params: {
      ...param,
      //   checkout_date: "2022-10-01",
      //   units: "metric",
      //   dest_id: "-553173",
      //   dest_type: "city",
      //   locale: "en-gb",
      //   adults_number: "2",
      //   order_by: "popularity",
      //   filter_by_currency: "AED",
      //   checkin_date: "2022-09-30",
      //   room_number: "1",
      //   children_number: "2",
      //   page_number: "0",
      //   children_ages: "5,0",
      //   categories_filter_ids: "class::2,class::4,free_cancellation::1",
      //   include_adjacency: "true",
    },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });
};
const searchLocations = ({ locale, name }) => {
  
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
    params: { locale, name },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      return response?.data;
      
    })
    .catch(function (error) {
      console.error(error);
    });
};
const searchFlight = (param) => {
  const options = {
    method: "GET",
    url: "https://booking-com.pr.apidapi.com/v1/hotels/locations",
    params: { ...param },
  };
  return axios
    .request(options)
    .then(function (response) {
      return response?.data;
      
    })
    .catch(function (error) {
      console.error(error);
    });
};
const searchAirport = (name) => {
  const options = {
    method: "GET",
    url: `https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&term=${name}`,
  };
  return axios
    .request(options)
    .then(function (response) {
      
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
const searchLocation = (address) => {
  const options = {
    method: "GET",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAxUKzZv6hmFRJN2rNBHMAgVQ5OUFIeKdo`,
  };
  return axios
    .request(options)
    .then(function (response) {
      
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
// const searchFlights = () => {

//   const options = {
//     method: "GET",
//     url: "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=LON&destination=BCN&departure_at=2022-10-08&return_at=2022-10-10&unique=false&sorting=price&direct=false&currency=usd&limit=30&page=1&one_way=true&token=2c4ddf4084ea7956b66118e986b99b7f",
//     // params: {
//     //   origin: "LON",
//     //   destination: "BCN",
//     //   departure_at: "2022-10-08",
//     //   return_at: "2022-10-10",
//     //   unique: "false",
//     //   sorting: "price",
//     //   direct: "false",
//     //   currency: "usd",
//     //   limit: "30",
//     //   page: "1",
//     //   one_way: "true",
//     //   token: "2c4ddf4084ea7956b66118e986b99b7f",
//     // },
//   };
//   return axios
//     .request(options)
//     .then(function (response) {
//       // 
//       return response?.data;
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };
const searchFlights = (origin, destination, departure_at, return_at) => {
  return API.get(
    `/api/hotels/searchFlights?origin=${origin}&destination=${destination}&departure_at=${departure_at}&return_at=${return_at}`
  ).then(
    (res) => res,
    (err) => err
  );
};
const hotelPhotos = (hotel_id) => {
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/photos",
    params: { locale: "en-gb", hotel_id },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
const hotelDiscription = (hotel_id) => {
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/description",
    params: { locale: "en-gb", hotel_id },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
const hotelQuestions = (hotel_id) => {
  
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/questions",
    params: { locale: "en-gb", hotel_id },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
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
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/car-rental/search",
    params: {
      locale: "en-gb",
      currency: "USD",
      sort_by: "recommended",
      locale: "en-gb",
      from_country:"it",
      drop_off_longitude,
      drop_off_latitude,
      drop_off_datetime,
      pick_up_longitude,
      pick_up_latitude,
      pick_up_datetime,
    },
    headers: {
      "X-RapidAPI-Key": "016ef36966msh58142b19a51d2d4p14378cjsn2c9e5fa13e54",
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };
  return axios
    .request(options)
    .then(function (response) {
      return response?.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
//1//03Gg5dYxmZVg3CgYIARAAGAMSNwF-L9IrQXKQvwvjGuPKv6DQtRFA909oW-eOuYaqh3Yn3BnHpJICf-jztBpYEutUgh8rUSOhsM8
export const hotelService = {
  searchHotel,
  searchLocations,
  searchAirport,
  searchLocation,
  searchFlights,
  hotelPhotos,
  hotelDiscription,
  hotelQuestions,
  searchCars
};
