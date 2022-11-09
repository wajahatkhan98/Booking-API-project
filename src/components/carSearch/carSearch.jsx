import {
  faArrowsRotate,
  faCalendarDays,
  faPlane,
  faSearch,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import { useDispatch } from "react-redux";
import { hotelAction } from "../../store/action/hotelFlightAction";
import RadioFilter from "../radioFilter/radioFilter";
import "./style.css";
const CarSearch = () => {
  const time = {
    hour: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    minutes: [
      "00",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
    ],
  };
  const dispatch = useDispatch();
  const [openDate, setOpenDate] = useState(false);
  const [coordinates, setCoordinates] = useState({ from: {}, to: {} });
  const [showList, setShowList] = useState({ from: false, to: false });
  const [locationList, setLocationList] = useState({ from: [], to: [] });
  const [check, setCheck] = useState(1);
  const [times, setTimes] = useState({
    startTime: { hour: "00", min: "00" },
    endTime: { hour: "00", min: "00" },
  });
  const selectCoordinates = (data, from) => {
    from
      ? setCoordinates((pre) => ({ ...pre, from: data }))
      : setCoordinates((pre) => ({ ...pre, to: data }));
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
  const onCheck = (e) => {
    setCheck(e.target.value);
  };
  const onSearch = (value, from) => {
    from
      ? setCoordinates((pre) => ({
          ...pre,
          from: { ...pre.from, formatted_address: value },
        }))
      : setCoordinates((pre) => ({
          ...pre,
          to: { ...pre.to, formatted_address: value },
        }));
    from
      ? setCoordinates((pre) => ({ ...pre, from: value }))
      : setCoordinates((pre) => ({ ...pre, to: value }));
    value.length > 0 &&
      dispatch(
        hotelAction.searchLocationLatLong(
          value,
          setLocationList,
          from,
          setShowList
        )
      );
  };
  const searchCars = () => {
    let pick_up_longitude = coordinates?.from?.geometry?.location?.lng;
    let pick_up_latitude = coordinates?.from?.geometry?.location?.lat;
    let pick_up_datetime =
      dates[0]?.startDate
        .toLocaleDateString("en-gb")
        .split("/")
        .reverse()
        .join("-") + ` ${times.startTime.hour + ":" + times.startTime.min}`;
    let drop_off_longitude =
      check == 1 ? pick_up_longitude : coordinates?.to?.geometry?.location?.lng;
    let drop_off_latitude =
      check == 1 ? pick_up_latitude : coordinates?.to?.geometry?.location?.lat;
    let drop_off_datetime =
      check == 1
        ? pick_up_datetime
        : dates[0]?.endDate
            .toLocaleDateString("en-gb")
            .split("/")
            .reverse()
            .join("-") + ` ${times.endTime.hour + ":" + times.endTime.min}`;
    if (
      pick_up_datetime.length < 1 ||
      pick_up_latitude.length < 1 ||
      drop_off_datetime.length < 1 ||
      drop_off_latitude.length < 1
    ) {
      alert("please fill all fields");
      return;
    }
    dispatch(
      hotelAction.searchCars(
        drop_off_longitude,
        drop_off_latitude,
        drop_off_datetime,
        pick_up_longitude,
        pick_up_latitude,
        pick_up_datetime
      )
    );
  };
  return (
    <>
      <div className="radio-parent">
        {/* <RadioFilter
          check={check == 1}
          checkedd={check}
          labelName={"Return to same location"}
        />
        <RadioFilter
          check={check == 2}
          checkedd={check}
          labelName={"Return to different location"}
        /> */}
        
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={check}
            onChange={onCheck}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Return to same location"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Return to different location"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="search-main1">
        <div className="search-children1">
          <div className="from-div">
            <FontAwesomeIcon className="icon-plane" icon={faTaxi} />
            <div className="input">
              <input
                value={coordinates?.from?.formatted_address}
                type="text"
                onChange={(e) => onSearch(e.target.value, true)}
                placeholder="Pickup location"
              />
            </div>
            <ul className={showList.from ? "cities-list1" : "none"}>
              {locationList.from &&
                locationList.from.map((airport, key) => (
                  <li
                    onClick={() => selectCoordinates(airport, true)}
                    key={key}
                    className="cities-item1"
                  >
                    <p>
                      {airport?.address_components[0]?.long_name +
                        "  , " +
                        airport?.address_components[2]?.long_name}
                    </p>
                    <span>{airport?.formatted_address}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className={`search-children1 ${check == 1 && "none"}`}>
          <div className="to-div">
            <FontAwesomeIcon className="icon-plane" icon={faTaxi} />
            <div className="input">
              <input
                value={coordinates?.to?.formatted_address}
                type="text"
                onChange={(e) => onSearch(e.target.value, false)}
                placeholder="Drop-off location"
              />
            </div>
            
            <ul className={showList.to ? "cities-list1" : "none"}>
              {locationList.to &&
                locationList.to.map((airport, key) => (
                  <li
                    onClick={() => selectCoordinates(airport, false)}
                    key={key}
                    className="cities-item1"
                  >
                    <p>
                      {airport?.address_components[0]?.long_name +
                        "  , " +
                        airport?.address_components[2]?.long_name}
                    </p>
                    <span>{airport?.formatted_address}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="search-children1">
          <div className="calender-div">
            <FontAwesomeIcon icon={faCalendarDays} className="icon-plane" />
            <span
              onClick={() => setOpenDate(!openDate)}
              // onBlur={() => setOpenDate(false)}
              className="headerSearchText"
            >{`${String(dates[0].checkin_date).slice(0, 10)} -  ${String(
              dates[0].checkout_date
            ).slice(0, 10)}`}</span>
            {openDate && (
              <div className="date1">
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
                  className="date1"
                  minDate={new Date()}

                  // maxDate={new Date()}
                />
                <div className="date-range">
                  <div>
                    <span>Pickup</span>
                    <select
                      onClick={(e) =>
                        setTimes((pre) => ({
                          ...pre,
                          startTime: {
                            ...pre.startTime,
                            hour: e?.target?.value,
                          },
                        }))
                      }
                      name=""
                      id=""
                    >
                      {time.hour.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {` : `}
                    <select
                      onClick={(e) =>
                        setTimes((pre) => ({
                          ...pre,
                          startTime: {
                            ...pre.startTime,
                            min: e?.target?.value,
                          },
                        }))
                      }
                      name=""
                      id=""
                    >
                      {time.minutes.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span>Drop-off</span>
                    <select
                      onClick={(e) =>
                        setTimes((pre) => ({
                          ...pre,
                          endTime: {
                            ...pre?.startTime,
                            hour: e?.target?.value,
                          },
                        }))
                      }
                      name=""
                      id=""
                    >
                      {time.hour.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {` : `}
                    <select
                      onClick={(e) =>
                        setTimes((pre) => ({
                          ...pre,
                          endTime: {
                            ...pre?.startTime,
                            min: e?.target?.value,
                          },
                        }))
                      }
                      name=""
                      id=""
                    >
                      {time.minutes.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div onClick={() => searchCars()} className="search-children">
          <FontAwesomeIcon icon={faSearch} className="icon-search" />
        </div>
      </div>
    </>
  );
};

export default CarSearch;
