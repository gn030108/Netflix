import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./DropDown.style.css";

const DropDown = ({ sort, setSort }) => {
  const [open, setOpen] = useState(false);
  const Desc = () => {
    setSort("Popularity(Desc)");
    setOpen(false);
  };
  const Asc = () => {
    setSort("Popularity(Asc)");
    setOpen(false);
  };

  return (
    <div className="box">
      <div className="select" onClick={() => setOpen(!open)}>
        {sort}
        <FontAwesomeIcon style={{ marginLeft: ".5rem" }} icon={faCaretDown} />
      </div>
      <ul className={`selectList ${open ? "open" : "close"}`}>
        <li onClick={Desc}>Popularity(Desc)</li>
        <li onClick={Asc}>Popularity(Asc)</li>
      </ul>
    </div>
  );
};

export default DropDown;
