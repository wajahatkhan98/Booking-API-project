import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from "react-redux";
import { hotelAction } from "../../store/action/hotelFlightAction";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [photos, setPhotos] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const hotel = location.state?.data;
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var set = [
    "https://europe1.discourse-cdn.com/katalon/original/2X/8/8b372ae5136c34c0fe42a42ac771f941601006f8.png",
    "https://europe1.discourse-cdn.com/katalon/original/2X/1/1540d7afca9817493ba4fc30fd77abda04864bbd.png",
    "https://user-images.githubusercontent.com/2872972/107010455-a5d6b880-6796-11eb-9a11-b95464386b19.png",
    "https://user-images.githubusercontent.com/2872972/107010455-a5d6b880-6796-11eb-9a11-b95464386b19.png",
    "https://user-images.githubusercontent.com/2872972/107010455-a5d6b880-6796-11eb-9a11-b95464386b19.png",
  ];
  const { dates, options } = useContext(SearchContext);
  const [description, setDescription] = useState({});
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(
      hotelAction.hotelPictures(location.pathname.split("/")[2], setPhotos)
    );
    dispatch(
      hotelAction.hotelDiscription(
        location.pathname.split("/")[2],
        setDescription
      )
    );
    dispatch(
      hotelAction.hotelQuestions(location.pathname.split("/")[2], setQuestions)
    );
  }, []);
  if (!hotel) {
    return <Navigate to="/hotels" />;
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={"data.photos[slideNumber]"}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotel?.hotel_name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotel?.distance_to_cc_formatted} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel?.min_total_price} at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              <Carousel
                showArrows={true}
                onChange={() => {}}
                onClickItem={() => {}}
                onClickThumb={() => {}}
              >
                {photos.map((item, index) => {
                  return (
                    <div>
                      <img src={item?.url_max} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{"Description"}</h1>
                <p className="hotelDesc">
                  {description?.extra_lines?.imp_info}
                </p>
                <p className="hotelDesc">{description?.description}</p>
                <div className="land-mark">
                  
                </div>
                <div className="faq">
                  <h1 style={{margin:20}}>Frequently asked question:</h1>
                  {questions?.q_and_a_pairs?.map((item, index) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faArrowDown} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{item?.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {item?.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {"days"}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {hotel?.review_score}!
                </span>
                <h2>
                  <b>${hotel?.min_total_price}</b> ({"1"}{" "}
                  night)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <div></div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
