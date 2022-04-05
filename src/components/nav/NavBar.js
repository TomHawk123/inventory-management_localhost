import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <ul className="nav">
      <li className="nav-links active">
        <Link className="nav-links" to="/inventory">
          Inventory
        </Link>
      </li>
      {localStorage.getItem("inventory__admin") ? (
        <li className="nav-links active">
          <Link className="nav-links" to="/users">
            Employees
          </Link>
        </li>
      ) : null}
      <li className="nav-links active">
        <Link className="nav-links" to="/userInventory">
          Employee Inventory
        </Link>
      </li>
      <li className="nav-links active">
        <Link
          className="nav-links"
          to="#"
          onClick={() => {
            localStorage.removeItem("inventory__user");
            localStorage.removeItem("inventory__admin");
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
