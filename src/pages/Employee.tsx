import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import User from "../components/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Paginate from "../components/paginate";

function Employee() {
  const [employeeList, setList] = useState<any[]>([]);
  const [singleData, setSingleData] = useState<any>();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("asc");
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getData(1).then(async (res: any) => {
      const data = await res.json();
      setLoading(false);
      setList(data);
      if (data.length) {
        setSingleData(data[0]);
      }
    });
  }, []);

  const getData = (
    pageNo: number,
    pageSize: number = 10,
    sortOrder: any = "asc"
  ): Promise<any> => {
    return fetch(
      `https://6529133b55b137ddc83e2ac7.mockapi.io/api/employee?p=${pageNo}&l=${pageSize}&sortBy=name&order=${sortOrder}`
    );
  };

  const getDataWithProperties = (pageNo: any) => {
    setPageNo(pageNo);
    getData(pageNo, pageSize, sort).then(async (res: any) => {
      const data = await res.json();
      setList(data);
      if (data.length) {
        setSingleData(data[0]);
      }
    });
  };

  const listUpdate = (data: any) => {
    const temp = [...employeeList];
    temp.forEach((item: any) => {
      if (data.id === item.id) {
        item.name = data.name;
      }
    });
    setList(temp);
  };

  const deleteEntry = (item: any) => {
    const filtered = employeeList.filter((x: any) => item.id !== x.id);
    setTimeout(() => {
      setList(filtered);
      setSingleData(filtered.length ? filtered[0] : {});
    }, 10);
  };

  const onListClick = (type: string, data?: any) => {
    if (type === "li") {
      setSingleData(data);
    }
    if (type === "icon") {
      deleteEntry(data);
    }
  };

  const onSortOrPageChange = (p: number, s: string) => {
    setPageSize(p);
    setSort(s);
    getData(pageNo, p, s).then(async (res: any) => {
      const data = await res.json();
      setList(data);
      if (data.length) {
        setSingleData(data[0]);
      }
    });
  };

  return isLoading ? (
    <h3>Loading.....</h3>
  ) : (
    <div className="main-container">
      <div className="left">
        <div className="top-section">
          <Navbar onSortOrPageChange={onSortOrPageChange} />
        </div>

        <div className="my-list">
          <ul>
            {employeeList?.map((item: any) => (
              <li
                className={
                  singleData?.id === item.id
                    ? "my-list-item  selected"
                    : "my-list-item"
                }
                key={item.id}
                onClick={() => {
                  onListClick("li", item);
                }}
              >
                <div className="details">
                  <img
                    className="img-section"
                    src={item.avatar}
                    alt={item.id}
                  />
                  <span>Name: {item.name}</span>
                  <span>Location: {item.location}</span>
                  <span className="delete-button">
                    <FontAwesomeIcon
                      onClick={() => onListClick("icon", item)}
                      icon={faTrash}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="pagination-section">
          {/* <ReactPaginate
            previousLabel={"Prev"}
            pageCount={10}
            breakLabel={"..."}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            activeClassName={"active"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            onPageChange={getDataWithProperties}
          /> */}

          <Paginate emitButtonData={getDataWithProperties}/>
        </div>
      </div>
      <div className="right">
        {singleData ? (
          <div className="employee-details">
            <User listUpdate={listUpdate} userData={singleData} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Employee;
