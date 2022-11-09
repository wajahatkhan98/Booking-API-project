import React from "react";
import CarSearch from "../../components/carSearch/carSearch";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Links from "../../components/Links/links";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";

const Car = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="header">
          <div className={"headerContainer header-flight"}>
            <Links active={3} />
            <h2 style={{ textAlign: "center" }}>
              Car rentals for any kind of trip
            </h2>
            <p style={{ textAlign: "center" }}>
              Compare deals from the biggest car rental companies
            </p>
            <CarSearch />
          </div>
        </div>
        <div className="homeContainer">
          <div className="flight-container">
            <div className="flight-list"></div>
          </div>
          <MailList />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Car;
