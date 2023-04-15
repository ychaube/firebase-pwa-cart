import {
  addCartItem,
  onCartItemsChange,
  onRemoveItemHandler,
} from "./utils/database.js";

// Utils
const elem = (id) => document.getElementById(id);

// Elements
const inputField = elem("input-field");
const addButton = elem("add-button");
const cart = elem("cart");

const UI_NoItem = () => {
  const content = document.createElement("p");
  content.className = "no-item"
  content.innerHTML = "No items present...";
  cart.appendChild(content);
}

const UI_AddItem = ([id, item]) => {
  const listItem = document.createElement("li");
  listItem.id = id;
  listItem.onclick = ({ target: { id } }) => onRemoveItemHandler(id);
  const listItemTextNode = document.createTextNode(item);
  listItem.appendChild(listItemTextNode);
  cart.appendChild(listItem);
};

const UI_ClearCart = () => {
  cart.innerHTML = "";
};

const UI_ClearInputField = () => {
  inputField.value = "";
};

onCartItemsChange((items) => {
  if (items.length) {
    UI_ClearCart();
    items.forEach(UI_AddItem);
  } else {
    UI_NoItem();
  }
});

// Event listeners
addButton.addEventListener("click", async () => {
  const { value } = inputField;

  addCartItem(value)
    .then(UI_ClearInputField)
    .catch((err) => {
      alert(err);
      console.error(err);
    });
});
