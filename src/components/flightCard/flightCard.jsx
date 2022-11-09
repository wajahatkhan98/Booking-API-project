import "./flightcard.css";
const FlightCard = ({ flight }) => {
  return (
    <>
      <div className="cardMain">
        <div className="left">
          <div className="left-head">
            <span className="best">best</span>
            <span className="cheap">cheapest</span>
          </div>
          <span className="left-body">
            <img
              src={
                "https://businesspost.ng/wp-content/uploads/2021/04/Emirates-Skywards.png"
              }
              alt=""
            />
            <span>{flight?.airline}</span>
          </span>
        </div>
        <div className="mid">
          <span className="starttime">
            <span>{String(flight?.departure_at).split('T')[1].split("+")[0]}</span>
            <p>{flight.origin_airport}</p>
          </span>
          <div className="line-dur">
            <div>direct</div>
          </div>
          <span className="endtime">
            <span>{String(flight?.departure_at).split('T')[1].split("+")[1]}</span>
            <p>{flight?.destination_airport}</p>
          </span>
        </div>
        <div className="right">
          <span>1h 55m</span>
        </div>
        <div className="last">
          <span className="price">US $ {flight.price}</span>
          <p className="person-no">/person</p>
          <button>View Deal</button>
        </div>
      </div>
    </>
  );
};
export default FlightCard;
