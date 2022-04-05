import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [user, setUser] = useState({});
  const conflictDialog = useRef();

  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("inventory__user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Maggie Mac's Windows & Doors New Employee Form
        </h1>

        <fieldset>
          <label htmlFor="name"> Full Name </label>
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="form-control"
            placeholder="Employee name"
            required
            autoFocus
          />
        </fieldset>

        <fieldset>
          <label htmlFor="address"> Address </label>
          <input
            onChange={updateUser}
            type="text"
            id="address"
            className="form-control"
            placeholder="Street address"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="phone"> Phone Number </label>
          <input
            onChange={updateUser}
            type="text"
            id="phone"
            className="form-control"
            placeholder="(555)555-5555"
            required
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email"> Email address </label>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="email@address.com"
            required
          />
        </fieldset>

        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Manager?</label>
            <input
              type="checkbox"
              onChange={(e) => {
                const copy = { ...user };
                copy.admin = e.target.checked;
                setUser(copy);
              }}
            />
          </div>
        </fieldset>

        <fieldset>
          <button type="submit"> Register </button>
        </fieldset>
      </form>
    </main>
  );
};
