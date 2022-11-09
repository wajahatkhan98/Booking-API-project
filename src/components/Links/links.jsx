import { faBed, faCar, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Links = ({ active }) => {
  return (
    <>
      <div className="headerList">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <div className={`headerListItem ${active == 1 && "active"}`}>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
        </Link>
        <Link to="/flight" style={{ textDecoration: "none", color: "white" }}>
          <div className={`headerListItem ${active == 2 && "active"}`}>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
        </Link>
        <Link to="/car" style={{ textDecoration: "none", color: "white" }}>
          <div className={`headerListItem ${active == 3 && "active"}`}>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
        </Link>
      </div>
    </>
  );
};
export default Links;
