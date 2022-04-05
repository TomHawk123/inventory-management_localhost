import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchInventoryTypes, sendEditedItem } from "../ApiManager";

export const EditInventoryForm = () => {
  const history = useHistory();
  const [item, update] = useState({});
  const [itemType, updateItemType] = useState([]);
  const { itemId } = useParams(); // Allows to bring in route parameters from the url to use in the component

  useEffect(() => {
    fetchInventoryTypes().then((type) => updateItemType(type));
    return fetch(`http://localhost:8088/inventories/${itemId}`)
      .then((r) => r.json())
      .then((inventoryObject) => update(inventoryObject));
  }, []);

  const editItem = (e) => {
    e.preventDefault();

    const newItem = {
      name: item.name,
      userId: parseInt(localStorage.getItem("inventory__user")),
      typeId: parseInt(item.typeId),
      quantity: parseInt(item.quantity),
      picture: item.picture,
      id: item.id,
    };

    sendEditedItem(newItem).then(() => {
      history.push("/inventory");
    });
  };

  return (
    <form className="inventoryForm">
      <h2 className="inventoryForm__title">Edit Inventory Item</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Type</label>
          <select
            value={item.typeId}
            name="location"
            type="select"
            required
            autoFocus
            onChange={(e) => {
              const copy = { ...item };
              copy.typeId = e.target.value;
              update(copy);
            }}
          >
            <option value="0">Item type...</option>
            {itemType.map((itemType) => (
              <option required key={`type--${itemType.id}`} value={itemType.id}>
                {itemType.nameOfType}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            onChange={(e) => {
              const copy = { ...item };
              copy.name = e.target.value;
              update(copy);
            }}
            required
            autoFocus
            type="text"
            className="form-control"
            defaultValue={item.name}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="quantity">quantity:</label>
          <input
            onChange={(e) => {
              const copy = { ...item };
              copy.quantity = e.target.value;
              update(copy);
            }}
            required
            autoFocus
            type="number"
            min="1"
            className="form-control"
            defaultValue={item.quantity}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="picture">Picture Url:</label>
          <input
            onChange={(e) => {
              const copy = { ...item };
              copy.picture = e.target.value;
              update(copy);
            }}
            required
            autoFocus
            type="url"
            className="form-control"
            defaultValue={item.picture}
          />
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={editItem}>
        Submit Item
      </button>
    </form>
  );
};
