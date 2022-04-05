import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchInventoryTypes, sendItem } from "../ApiManager";

export const InventoryForm = () => {
  const history = useHistory();
  const [item, update] = useState({
    name: "",
    userId: null,
    typeId: null,
    quantity: null,
    picture: "",
  });
  const [itemType, updateItemType] = useState([]);

  useEffect(() => {
    fetchInventoryTypes().then((type) => updateItemType(type));
  }, []);

  const saveItem = (e) => {
    e.preventDefault();

    const newItem = {
      name: item.name,
      userId: parseInt(localStorage.getItem("inventory__user")),
      typeId: parseInt(item.typeId),
      quantity: parseInt(item.quantity),
      picture: item.picture,
    };

    return sendItem(newItem).then(() => {
      history.push("/inventory");
    });
  };

  return (
    <form className="inventoryForm">
      <h2 className="inventoryForm__title">New Inventory Item</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Type</label>
          <select
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
            <option value="">Item type...</option>
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
            placeholder="10X10, pop-up, stand-alone, 6 ft., etc."
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
            placeholder="Quantity..."
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
            placeholder="image@url.com"
          />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={saveItem}>
        Submit Item
      </button>
    </form>
  );
};
