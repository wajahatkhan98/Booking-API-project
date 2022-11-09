import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import PriceSlider from "../../components/priceSlider/priceSlider";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { hotelAction } from "../../store/action/hotelFlightAction";
import { hotelConstant } from "../../store/constants";
import FilterItem from "../../components/filterItem/filterItem";
import { TailSpin } from "react-loader-spinner";
const List = () => {
  const filters = [
    {
      heading: "Your budget (per night)",
      list: [
        { name: "0 - 10,000" },
        { name: "10,000 - 20,000" },
        { name: "20,000 - 30,000" },
        { name: "30,000 - 40,000" },
        { name: "40,000+" },
      ],
    },
    {
      heading: "Popular filters",
      list: [
        { name: "Hotels" },
        { name: "Free cancellation" },
        { name: "No prepayment" },
        { name: "Apartments" },
      ],
    },
    {
      heading: "Star rating",
      list: [
        { name: "1 star" },
        { name: "2 star" },
        { name: "3 stars" },
        { name: "4 stars" },
        { name: "5 stars" },
        { name: "Unrated" },
      ],
    },
    {
      heading: "Property type",
      list: [
        { name: "Apartments" },
        { name: "Hotels" },
        { name: "Villas" },
        { name: "Resorts" },
      ],
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const hotels = useSelector((state) => state?.Hotel_Reducer?.hotels);
  const [destination, setDestination] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(location?.state?.checkin_date),
      endDate: new Date(location?.state?.checkout_date),
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [showList, setShowList] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    ...location?.state,
    children_number: !location?.state?.children_number
      ? 0
      : location?.state?.children_number,
  });
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [data, setData] = useState([
    {
      photos: [
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/271763568.jpg?k=8337919c5c30e28a3225cef09379c1f30fda121918f53816f2c27cd00621fa11&o=&hp=1",
      ],
      name: "Pearl Continental",
      distance: 100,
      desc: "discriptoion",
      rating: 5,
      cheapestPrice: 100,
      _id: "1111111",
    },
    {
      photos: [
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/271763568.jpg?k=8337919c5c30e28a3225cef09379c1f30fda121918f53816f2c27cd00621fa11&o=&hp=1",
      ],
      name: "Pearl Continental",
      distance: 100,
      desc: "discriptoion",
      rating: 5,
      cheapestPrice: 100,
      _id: "1111111",
    },
    {
      photos: [
        "https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/271763568.jpg?k=8337919c5c30e28a3225cef09379c1f30fda121918f53816f2c27cd00621fa11&o=&hp=1",
      ],
      name: "Pearl Continental",
      distance: 100,
      desc: "discriptoion",
      rating: 5,
      cheapestPrice: 100,
      _id: "1111111",
    },
  ]);
  useEffect(() => {
    dispatch({
      type: hotelConstant.GET_HOTELS,
      payload: JSON.parse(localStorage.getItem("hotels")),
    });
  }, []);
  const handleClick = () => {
    if (!destination || destination?.dest_id?.length < 1) {
      alert("please select destination");
      return;
    } else if (dates[0]?.startDate == dates[0]?.endDate) {
      alert("checkout date should be graeter than checkin date");
      return;
    }
    setLoading(true);
    dispatch(
      hotelAction.searchHotel(
        {
          ...options,
          checkin_date: dates[0].startDate
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-"),
          checkout_date: dates[0].endDate
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-"),
          dest_id: destination?.dest_id,
          dest_type: "city",
          locale: "en-gb",
          order_by: "popularity",
          filter_by_currency: "USD",
          room_number: 1,
          units: "metric",
        },
        false,
        setLoading
      )
    );
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const searchCity = (e) => {
    e.target.value.length > 0 &&
      dispatch(
        hotelAction.searchLocation(
          { locale: "en-gb", name: e.target.value },
          setCities,
          setShowList
        )
      );
    setDestination(e.target.value);
  };
  const selectCity = (city) => {
    setDestination(city);
    setShowList(false);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <>
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              {/* <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" />
              </div> */}
              <div
                style={{ position: "relative" }}
                className="headerSearchItem lsItem"
              >
                <label>Destination/property name:</label>
                <div className="auto-complete1">
                  <FontAwesomeIcon icon={faBed} className="headerIcon1" />
                  <div className="input">
                    <input
                      type="text"
                      value={destination?.label}
                      placeholder="Where are you going?"
                      className="headerSearchInput"
                      onChange={(e) => searchCity(e)}
                    />
                  </div>
                  <ul
                    className={
                      cities.length > 0 && showList ? "cities-list1" : "none"
                    }
                  >
                    {cities.map((city, key) => (
                      <li
                        onClick={() => selectCity(city)}
                        key={key}
                        className="cities-item"
                      >
                        {city?.label}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* /> */}
              </div>

              <div className="lsItem">
                <label>CheckIn Date - CheckOut Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${String(
                  dates[0].startDate
                ).slice(0, 10)}   --   ${String(dates[0].endDate).slice(
                  0,
                  10
                )}`}</span>
                {openDate && (
                  <div style={{ position: "absolute", top: 220 }}>
                    <DateRange
                      onChange={(item) => {
                  
                        setDates([item?.range1]);
                      }}
                      minDate={new Date()}
                      ranges={dates}
                    />
                  </div>
                )}
              </div>
              <div className="headerSearchItem1">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adults_number} adult · ${options.children_number} children · ${options.room_number} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adults_number <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adults_number", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adults_number}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adults_number", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children_number <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children_number", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children_number}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children_number", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room_number <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room_number", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room_number}
                        </span>

                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room_number", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                 
                </div>
              </div> */}
              {loading ? (
                <div className="search2">
                <TailSpin
                  height="30"
                  width="30"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                </div>
              ) : (
                <button className="search-btn" onClick={handleClick}>
                  Search
                </button>
              )}
            </div>
            <div className="filters">
              <h3>Filters</h3>
              {filters.map((item, index) => (
                <div key={index} className="filter-box">
                  <h5 className="filter-box-heading">Your buget perr night</h5>
                  {item.list.map((item1, index1) => (
                    <FilterItem
                      key={index + index1 + item1.name}
                      value={item1.name}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        </div>
        <div className="listResult">
          {hotels?.result?.length < 1 ? (
            <h2>No Result Found</h2>
          ) : (
            <h2> {hotels?.result?.length} properties found</h2>
          )}
          {false ? (
            "loading"
          ) : (
            <>
              {hotels?.result?.map((item) => (
                <SearchItem item={item} key={item?._id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
