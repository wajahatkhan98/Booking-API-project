import {
  faArrowsRotate,
  faCalendarDays,
  faPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch } from "react-redux";
import { hotelAction } from "../../store/action/hotelFlightAction";
import "./style.css";
const FlightSearch = ({setLoading}) => {
  const dispatch = useDispatch();
  const [openDate, setOpenDate] = useState(false);
  const [fromAirport, setFromAirport] = useState({ name: "" });
  const [toAirport, setToAirport] = useState({ name: "" });
  const [showList, setShowList] = useState({ from: false, to: false });
  const [airportList, setAirportList] = useState({ from: [], to: [] });
  const selectAirport = (data, from) => {
    from
      ? setFromAirport((pre) => ({ ...data }))
      : setToAirport((pre) => ({ ...data }));
    from
      ? setShowList((pre) => ({ ...pre, from: false }))
      : setShowList((pre) => ({ ...pre, to: false }));
  };
  const [dates, setDates] = useState([
    {
      checkin_date: new Date(),
      checkout_date: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const onSearch = (value, from) => {
    from
      ? setFromAirport((pre) => ({ ...pre, name: value }))
      : setToAirport((pre) => ({ ...pre, name: value }));
    dispatch(
      hotelAction.searchAirport(value, setAirportList, from, setShowList)
    );
  };
  const searchAirport = () => {
    
    if (fromAirport.name === "" || toAirport.name == "") {
      alert("Please fill all form");
      return;
    } else if (dates[0].startDate === dates[0].endDate) {
      alert("start date should not be same");
    }
    setLoading(true)

    dispatch(
      hotelAction.searchFlights(
        fromAirport?.code,
        toAirport?.code,
        dates[0].startDate
          .toLocaleDateString("en-gb")
          .split("/")
          .reverse()
          .join("-"),
        dates[0].endDate
          .toLocaleDateString("en-gb")
          .split("/")
          .reverse()
          .join("-"),
          setLoading
          )
    );
  };
  return (
    <>
      <div className="search-main">
        
        <div className="search-children">
          <div className="from-div">
            <FontAwesomeIcon className="icon-plane" icon={faPlane} />
            <div className="input">
              <input
                value={fromAirport?.name}
                type="text"
                onChange={(e) => onSearch(e.target.value, true)}
                placeholder="from"
              />
            </div>
            <ul className={showList.from ? "cities-list1" : "none"}>
              {airportList.from.map((airport, key) => (
                <li
                  onClick={() => selectAirport(airport, true)}
                  key={key}
                  className="cities-item1"
                >
                  {airport?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="search-children">
          <FontAwesomeIcon
            className="icon-arrow-rotate"
            icon={faArrowsRotate}
          />
        </div>

        <div className="search-children">
          <div className="to-div">
            <FontAwesomeIcon className="icon-plane" icon={faPlane} />
            <div className="input">
              <input
                type="text"
                value={toAirport?.name}
                onChange={(e) => onSearch(e.target.value, false)}
                placeholder="to"
              />
            </div>
            <ul className={showList.to ? "cities-list1" : "none"}>
              {airportList.to.map((airport, key) => (
                <li
                  onClick={() => selectAirport(airport, false)}
                  key={key}
                  className="cities-item1"
                >
                  {airport?.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="search-children">
          <div className="calender-div">
            <FontAwesomeIcon icon={faCalendarDays} className="icon-plane" />
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
        </div>

        <div onClick={() => searchAirport()} className="search-children">
          <FontAwesomeIcon icon={faSearch} className="icon-search" />
        </div>
      </div>
    </>
  );
};
export default FlightSearch;
