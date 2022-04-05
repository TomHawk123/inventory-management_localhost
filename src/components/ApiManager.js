// store API url
const API = "http://localhost:8088";

// export a fetch call for each data type?
// A:
export const fetchInventory = () =>
  fetch(`${API}/inventories?_expand=user&_expand=type`).then((r) => r.json());

export const fetchUsers = () => fetch(`${API}/users`).then((r) => r.json());

export const fetchUserInventory = () =>
  fetch(
    `${API}/userInventory?_expand=user&_expand=inventory&userId=${parseInt(
      localStorage.getItem("inventory__user")
    )}`
  ).then((r) => r.json());

export const fetchAllUserInventory = () =>
  fetch(`${API}/userInventory?_expand=user&_expand=inventory`).then((r) =>
    r.json()
  );

export const fetchInventoryTypes = () =>
  fetch(`${API}/types`).then((r) => r.json());

export const sendItem = async (newItem) => {
  const fetchOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newItem),
  };
  const res = await fetch(`${API}/inventories`, fetchOption);
  return await res.json();
};

export const sendUserItem = (inventoryObject) => {
  const newUserInventoryObject = {
    inventoryId: inventoryObject.id,
    userId: parseInt(localStorage.getItem("inventory__user")),
    timestamp: Date.now(),
  };
  const fetchOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUserInventoryObject),
  };
  return fetch(`${API}/userInventory`, fetchOption).then(() => {
    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ quantity: inventoryObject.quantity - 1 }),
    };
    return fetch(`${API}/inventories/${inventoryObject.id}`, fetchOption);
  });
};

export const returnItem = (inventory, userInventoryId) => {
  const fetchOption = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ quantity: inventory.quantity + 1 }),
  };
  return fetch(`${API}/inventories/${inventory.id}`, fetchOption).then(() => {
    return fetch(`${API}/userInventory/${userInventoryId}`, {
      method: "DELETE",
    });
  });
};

export const sendEditedItem = (newItem) => {
  return fetch(`${API}/inventories/${newItem.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
};
