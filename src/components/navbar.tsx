import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Navbar(props: any) {
  const { onSortOrPageChange } = props;
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(10);

  const OnSort = () => {
    const sO = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(sO);
    sendDataToList(pageSize, sO);
  };

  const onPageSizeChange = (event: any) => {
    const page = parseInt(event?.target.value);
    setPageSize(page);
    sendDataToList(page, sortOrder);
  };

  const sendDataToList = (pageSize: number, sortOrder: string) => {
    onSortOrPageChange(pageSize, sortOrder);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">#LEARN REACT</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item arrow-icon">
              {sortOrder === "asc" ? (
                <FontAwesomeIcon icon={faArrowDown} onClick={OnSort} />
              ) : (
                <FontAwesomeIcon icon={faArrowUp} onClick={OnSort} />
              )}
            </li>
            <li className="nav-item">
              <select value={pageSize} onChange={(e) => onPageSizeChange(e)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
