// Boolean approach

// {user.admin===true? <button> </button> : null}

// const thing = () => {

//     return {good || bad ? "on" : "off"}
// }

// let good = true
// let bad = false

// if (good || bad) {
//     console.log("on")
// }

{
  inventoryObject.quantity > 0 === true ? (
    <button
      className="inventoryButton"
      onClick={() => {
        sendUserItem(inventoryObject)
          .then(() => {
            return fetchInventory();
          })
          .then((inventoryArray) => {
            setInventoryList(inventoryArray);
          });
      }}
    >
      Checkout
    </button>
  ) : null;
}

fetchUserInventory().then((inventoryArray) => {
  setUserInventoryList(inventoryArray);
  setInventorySwitch(true);
});
