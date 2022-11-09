import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { hotelAction } from "../../store/action/hotelFlightAction";
import { useDispatch } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import Links from "../Links/links";
import { ThreeCircles } from "react-loader-spinner";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([
    {
      checkin_date: new Date(),
      checkout_date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adults_number: 1,
    children_number: 0,
    room_number: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (!destination.dest_id) {
      alert("please select destination");
      return;
    } else if (
      dates[0]?.startDate.toLocaleDateString("en-gb") ==
      dates[0]?.endDate.toLocaleDateString("en-gb")
    ) {
      alert("checkout date should be graeter than checkin date");
      return;
    }
    setLoading(true);
    dispatch(
      hotelAction.searchHotel(
        {
          ...options,
          checkin_date: dates[0].checkin_date
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-"),
          checkout_date: dates[0].checkout_date
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
        navigate,
        setLoading
      )
    );
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
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <Links active={1} />

        {type !== "list" && (
          <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search low prices on hotels, homes and much more...
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <div className="auto-complete">
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
                    cities.length > 0 && showList ? "cities-list" : "none"
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
                {/* /> */}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${String(dates[0].checkin_date).slice(0, 10)} -  ${String(
                  dates[0].checkout_date
                ).slice(0, 10)}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      
                      setDates([
                        {
                          ...item.selection,
                          checkin_date: item.selection.startDate,
                          checkout_date: item.selection.endDate,
                        },
                      ]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                    // maxDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
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
              <div className="headerSearchItem">
                {loading ? (
                  <ThreeCircles
                    height="40"
                    width="40"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                ) : (
                  <button className="headerBtn" onClick={handleSearch}>
                    Search
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
