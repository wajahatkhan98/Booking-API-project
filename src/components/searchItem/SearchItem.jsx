import { Link, useNavigate } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="searchItem"
      onClick={() => {
        navigate(`/hotels/${item?.hotel_id}`, {state:{ data: item }});
      }}
    >
      <img src={item.max_1440_photo_url} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.hotel_name}</h1>
        <span className="siDistance">{item.distance}km from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span>{item?.address}</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        {/* <span className="siFeatures">{item.desc}</span> */}
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item?.review_score && (
          <div className="siRating">
            <span>{item?.review_score_word}</span>
            <button>{item?.review_score}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">
            ${Number(item?.min_total_price).toFixed(2)}
          </span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item?._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
