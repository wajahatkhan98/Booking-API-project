import { useEffect, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import FlightCard from "../../components/flightCard/flightCard";
import FlightSearch from "../../components/flightSearch/flightSearch";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Links from "../../components/Links/links";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import { hotelConstant } from "../../store/constants";
import "./style.css";
const Flight = () => {
  const dispatch = useDispatch();
  let flights = useSelector((state) => state?.Hotel_Reducer?.flights);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    flights?.length < 0 &&
      dispatch({
        type: hotelConstant.GET_FLIGHTS,
        payload: JSON.parse(localStorage.getItem("flights")),
      });
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <div className="header">
          <div className={"headerContainer header-flight"}>
            <Links active={2} />
            <h3 style={{ textAlign: "center" }}>
              Welcome! Find a flexible flight for your next trip.
            </h3>
            <FlightSearch setLoading={setLoading} />
          </div>
        </div>
        <div className="homeContainer">
          {loading ? (
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              outerCircleColor=""
              innerCircleColor=""
              barColor=""
              ariaLabel="circles-with-bar-loading"
            />
          ) : (
            <div className="flight-container">
              {flights?.length < 1 && <h1>No result found</h1>}
              {flights?.length > 1 && (
                <div className="flight-list">
                  {flights.map((flight) => {
                    return <FlightCard flight={flight} />;
                  })}
                </div>
              )}
            </div>
          )}
          <MailList />
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Flight;
