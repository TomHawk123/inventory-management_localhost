import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    fetchInventory,
    fetchUserInventory,
    sendUserItem,
} from "../ApiManager";
import "./Inventory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

// export a function that will return the HTML
export const InventoryList = () => {
    const history = useHistory();
    // set up variables for application state with useState hook
    const [inventoryList, setInventoryList] = useState([]);
    const [userInventory, setUserInventory] = useState([]);
    const [totalItemsMessage, updateMessage] = useState("");

    // fetch inventory list when inventory state changes
    useEffect(
        () => {
            fetchInventory().then((inventoryArray) => {
                setInventoryList(inventoryArray);
            });
            fetchUserInventory().then((userInventoryArray) => {
                setUserInventory(userInventoryArray);
            });
        },
        [] // Only run when initial JSX rendering is complete.
    );

    useEffect(() => {
        if (inventoryList.length === 1) {
            updateMessage("You have 1 inventory item");
        } else {
            updateMessage(`You have ${inventoryList.length} inventory line items`);
        }
    }, [inventoryList]);

    const deleteItem = (id) => {
        fetch(`http://localhost:8088/inventories/${id}`, {
            method: "DELETE",
        })
            .then(fetchInventory)``
            .then((inventoryArray) => {
                setInventoryList(inventoryArray);
            });
    };

    return (
        <>
            <div id="totalItemsMessage">{totalItemsMessage}</div>

            {localStorage.getItem("inventory__admin") ? (
                <button
                    className="inventoryListCreateButton"
                    onClick={() => history.push("/inventory/create")}
                >
                    Create New
                </button>
            ) : null}

            <div id="centerpiece">
                {inventoryList.map((inventoryObject) => (
                    <div
                        key={`deleteItem--${inventoryObject.id}`}
                        className="inventory__List"
                        onClick={() => {
                            if (inventoryObject.quantity > 0) {
                                sendUserItem(inventoryObject)
                                    .then(() => {
                                        return fetchInventory();
                                    })
                                    .then((inventoryArray) => {
                                        setInventoryList(inventoryArray);
                                    });
                            }
                        }}
                    >
                        {inventoryObject.name} {inventoryObject.type.nameOfType}
                        <p className="inventoryListParagraph"></p>
                        <div id="imgWrapper">
                            <img id="inventoryImg" src={inventoryObject.picture} />
                        </div>
                        {inventoryObject.quantity > 0 ? (
                            <p>
                                In Stock <b>{inventoryObject.quantity}</b>
                            </p>
                        ) : (
                            <b>Out of Stock</b>
                        )}
                        <article className="buttonContainer">
                            {localStorage.getItem("inventory__admin") ? (
                                <button
                                    id="editButton"
                                    onClick={() =>
                                        history.push(`/inventory/${inventoryObject.id}`)
                                    }
                                >
                                    <FontAwesomeIcon icon={faPencil} />
                                </button>
                            ) : null}

                            <button
                                onClick={() => {
                                    if (inventoryObject.quantity > 0) {
                                        sendUserItem(inventoryObject)
                                            .then(() => {
                                                return fetchInventory();
                                            })
                                            .then((inventoryArray) => {
                                                setInventoryList(inventoryArray);
                                            });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>

                            {localStorage.getItem("inventory__admin") ? (
                                <button
                                    id="deleteButton"
                                    onClick={() => {
                                        deleteItem(inventoryObject.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            ) : null}
                        </article>
                    </div>
                ))}
            </div>
        </>
    );
};
