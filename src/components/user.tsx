import { useEffect, useState } from "react";

function User(props: any) {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isNameChanged, setIsNameChanged] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});
  let initialData = { ...props.userData };
  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  const onNameChange = (e: any) => {
    setUserData({ ...userData, name: e.target.value });
    setIsNameChanged(false);
  };

  const onEditOrCancel = (type: string) => {
    setEdit(!isEdit);
    if (type === "Cancel") {
      setUserData(initialData);
    }
  };

  const editDataApi = () => {
    if (initialData.name !== userData.name) {
      fetch(
        `https://6529133b55b137ddc83e2ac7.mockapi.io/api/employee/${userData.id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userData),
        }
      ).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          initialData = data;
          setUserData(data);
          setEdit(false);
          setIsNameChanged(true);
          props.listUpdate(data);
        }
      });
    }
  };

  return (
    <>
      <img src={userData.avatar} className="ind-img" alt={userData.id} />
      <div className="ind-user-container">
        <div className="ind-items">Name :</div>
        {isEdit ? (
          <input
            type="text"
            className="form-control ind-input"
            value={userData?.name}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={onNameChange}
          ></input>
        ) : (
          <div className="ind-items">{userData?.name}</div>
        )}
      </div>
      <div className="ind-user-container">
        <div className="ind-items">Location :</div>
        <div className="ind-items">{userData?.location}</div>
      </div>
      <div className="ind-user-container">
        <div className="ind-items">Employee ID :</div>
        <div className="ind-items">{userData?.emp_Id}</div>
      </div>
      <div className="ind-user-container">
        <div className="ind-items">Work Area :</div>
        <div className="ind-items">{userData?.work_Area}</div>
      </div>
      <div className="ind-user-container">
        <button
          type="button"
          className="btn btn-primary ind-btn"
          onClick={() => onEditOrCancel(isEdit ? "Cancel" : "Edit")}
        >
          {isEdit ? "Cancel" : "Edit"}
        </button>
        {isEdit && (
          <button
            disabled={isNameChanged}
            onClick={() => editDataApi()}
            type="button"
            className="btn btn-success ind-btn"
          >
            Save
          </button>
        )}
      </div>
    </>
  );
}

export default User;
