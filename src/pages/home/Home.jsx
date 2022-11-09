import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import { userAction } from "../../store/action/user.action";
import "./home.css";

const Home = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(userAction.getUserDatils())
  },[])
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
