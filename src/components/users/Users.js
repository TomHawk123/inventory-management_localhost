import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../ApiManager";
import "./Users.css";

// export a function that will return the HTML
export const UsersList = () => {
  // set up variables for application state with useState hook
  const [usersArray, setUsersArray] = useState([]);

  // fetch user list when user state changes
  useEffect(
    () => {
      fetch("http://localhost:8088/users")
        .then((r) => r.json())
        .then((usersArray) => {
          setUsersArray(usersArray);
        });
    },
    [] // DON'T FORGET to add userList when state change monitoring is necessary
  );

  const deleteItem = (id) => {
    fetch(`http://localhost:8088/users/${id}`, {
      method: "DELETE",
    })
      .then(fetchUsers)
      .then((usersArray) => {
        setUsersArray(usersArray);
      });
  };

  return (
    <>
      <div className="userListSpacer"></div>

      <div id="userListContainer">
        <div id="userList">
          {usersArray.map((userObject) => {
            if (
              userObject.id !==
              parseInt(localStorage.getItem("inventory__admin"))
            ) {
              return (
                <div key={`userItem--${userObject.id}`} id="employeeList">
                  <div className="employees" key={`userItem--${userObject.id}`}>
                    <button
                      className="deleteButton"
                      onClick={() => {
                        deleteItem(userObject.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    {userObject.name}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="addEmployee">
        <button id="addEmployee">
          <Link className="link" to="/register">
            Add New Employee
          </Link>
        </button>
      </div>
    </>
  );
};
