import React, { useEffect, useState } from "react";
import {
  fetchAllUserInventory,
  fetchInventoryTypes,
  fetchUserInventory,
  returnItem,
} from "../ApiManager";
import "./UserInventory.css";

// export a function that will return the HTML
export const UserInventoryList = () => {
  // set up variables for application state with useState hook
  const [userInventoryArray, setUserInventoryList] = useState([]);
  const [totalItemsMessage, updateMessage] = useState("");
  const [types, setTypes] = useState([]);
  const [inventorySwitch, setInventorySwitch] = useState(false);

  // fetch inventory list when inventory state changes
  useEffect(() => {
    // use expand to get access to user properties
    if (localStorage.getItem("inventory__admin")) {
      fetchAllUserInventory().then((inventoryArray) => {
        setUserInventoryList(inventoryArray);
        setInventorySwitch(true);
      });
    } else {
      fetchUserInventory().then((inventoryArray) => {
        setUserInventoryList(inventoryArray);
        setInventorySwitch(true);
      });
    }
  }, []);

  useEffect(() => {
    fetchInventoryTypes().then((typeArray) => {
      let copy = [...userInventoryArray];
      let copyTypes = copy.map((inventory) => {
        let found = typeArray.find(
          (type) => type.id === inventory.inventory.typeId
        );
        inventory.inventory.type = found;

        return inventory;
      });
      setUserInventoryList(copyTypes);
      setTypes(typeArray);
    });
  }, [inventorySwitch]);

  useEffect(() => {
    if (localStorage.getItem("inventory__admin")) {
      if (userInventoryArray.length === 1) {
        updateMessage("There is 1 inventory item checked out.");
      } else {
        updateMessage(
          `There are ${userInventoryArray.length} inventory items checked out.`
        );
      }
    } else {
      if (userInventoryArray.length === 1) {
        updateMessage("You have 1 inventory item");
      } else {
        updateMessage(`You have ${userInventoryArray.length} inventory items`);
      }
    }
  }, [userInventoryArray]);
  // RETURN BUTTON
  // When button is clicked, subtract one from userInventory item quanity and add one to
  // master inventory item.quantity. Use Patch method as a fetchOption
  return (
    <>
      <div id="itemsNumberMessage">{totalItemsMessage}</div>

      {userInventoryArray.map((inventoryObject) => {
        // initialize new Date object
        const date_ob = new Date(inventoryObject.timestamp);

        // year as 4 digits (YYYY)
        const year = date_ob.getFullYear();

        // month as 2 digits (MM)
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // date as 2 digits (DD)
        const date = ("0" + date_ob.getDate()).slice(-2);

        // hours as 2 digits (hh)
        const hours = ("0" + date_ob.getHours()).slice(-2);

        // minutes as 2 digits (mm)
        const minutes = ("0" + date_ob.getMinutes()).slice(-2);

        // seconds as 2 digits (ss)
        const seconds = ("0" + date_ob.getSeconds()).slice(-2);

        return (
          <div
            id="UserInventoryList--container"
            key={`inventoryItem--${inventoryObject.id}`}
          >
            <div className="userInventoryList--paragrpah">
              <button
                id="userInventoryButton"
                onClick={() => {
                  returnItem(
                    inventoryObject.inventory,
                    inventoryObject.id
                  ).then(() => {
                    if (localStorage.getItem("inventory__admin")) {
                      fetchAllUserInventory().then((inventoryArray) => {
                        setUserInventoryList(inventoryArray);
                        setInventorySwitch(true);
                      });
                    } else {
                      fetchUserInventory().then((inventoryArray) => {
                        setUserInventoryList(inventoryArray);
                        setInventorySwitch(true);
                      });
                    }
                  });
                }}
              >
                Return
              </button>
              <b>{inventoryObject.inventory.name} {inventoryObject.inventory.type?.nameOfType}</b> checked out at {hours}:{minutes}:
              {seconds} on {month}/{date}/{year}{" "}
              {localStorage.getItem("inventory__admin")
                ? `by ${inventoryObject.user.name}`
                : null}
            </div>
          </div>
        );
      })}
    </>
  );
};
