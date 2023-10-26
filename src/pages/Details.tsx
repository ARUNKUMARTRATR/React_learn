import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../styles/details.module.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type ActionType = {
  payload: any;
  type: string;
};
function Details() {
  const params = useParams();
  const [userData, dispatchUserData] = useReducer(userDataReducerFn, {
    name: "",
    location: "",
    emp_Id: "",
    work_Area: "",
    avatar: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      fetch(
        `https://6529133b55b137ddc83e2ac7.mockapi.io/api/employee/${params.id}`
      ).then(async (res: any) => {
        const data = await res.json();
        setInitialData({ ...data });
        dispatchUserData({ payload: data, type: "initial" });
      });
    }
  }, [params.id]);

  function userDataReducerFn(state: any, action: ActionType): any {
    switch (action.type) {
      case "initial":
        return { ...state, ...action.payload };
      case "name":
        return {
          ...state,
          name: action.payload,
        };
      case "location":
        return {
          ...state,
          location: action.payload,
        };
      case "workarea":
        return {
          ...state,
          work_Area: action.payload,
        };
      default:
        return state;
    }
  }

  const onSubmit = (e: any) => {
    fetch(
      `https://6529133b55b137ddc83e2ac7.mockapi.io/api/employee/${userData.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData),
      }
    ).then(async (res) => {
      const data = await res.json();
      setIsEdit(false);
      setIsEdited(false);
      dispatchUserData({ type: "initial", payload: data });
      setInitialData(data);
      navigateBack();
    });
  };

  const onValueChanged = (type: string, payload: any) => {
    dispatchUserData({ type: type, payload });
    setIsEdited(true);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return params.id === userData.id ? (
    <>
      <span onClick={navigateBack} className={style.back_icon}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
      </span>
      <div className={style.main_sec}>
        <div className={style.details_sec}>
          <div className={style.inner + " " + style.img_sec}>
            <img src={userData.avatar} alt="profile_image" />
          </div>
          <div className={style.inner}>
            <label htmlFor="label" className={style.input_sec_label}>
              EMPLOYEE ID:
            </label>
            <input
              disabled
              value={userData.emp_Id}
              type="text"
              name="employeeId"
              className={"form-control" + " " + style.input_sec_label}
            />
          </div>
          <div className={style.inner}>
            <label htmlFor="label" className={style.input_sec_label}>
              NAME:
            </label>
            <input
              disabled={!isEdit}
              onChange={(e) => onValueChanged("name", e.target.value)}
              name="name"
              value={userData.name}
              type="text"
              className={"form-control" + " " + style.input_sec_label}
            />
          </div>
          <div className={style.inner}>
            <label htmlFor="label" className={style.input_sec_label}>
              LOCATION:
            </label>
            <input
              disabled={!isEdit}
              onChange={(e) => onValueChanged("location", e.target.value)}
              type="text"
              value={userData.location}
              name="location"
              className={"form-control" + " " + style.input_sec_label}
            />
          </div>
          <div className={style.inner}>
            <label htmlFor="label" className={style.input_sec_label}>
              WORK AREA:
            </label>
            <input
              disabled={!isEdit}
              onChange={(e) => onValueChanged("workarea", e.target.value)}
              name="workArea"
              value={userData.work_Area}
              type="text"
              className={"form-control" + " " + style.input_sec_label}
            />
          </div>
          <div className={style.inner}>
            <button
              onClick={() => {
                if (isEdit) {
                  dispatchUserData({ type: "initial", payload: initialData });
                }
                setIsEdit(!isEdit);
              }}
              className={"btn btn-warning" + " " + style.buttons}
            >
              {isEdit ? "CANCEL" : "EDIT"}
            </button>
            <button
              disabled={!isEdited}
              onClick={onSubmit}
              type="submit"
              className={"btn btn-primary" + " " + style.buttons}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h2>No Data...</h2>
  );
}

export default Details;
