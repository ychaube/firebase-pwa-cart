import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const APP_CONFIG = {
  databaseURL:
    "https://fir-cart-b2925-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const FB_APP = initializeApp(APP_CONFIG);
const FB_DB = getDatabase(FB_APP);

const CART_ITEMS_DB_NAME = "cart-items";
const CART_ITEMS_DB = ref(FB_DB, CART_ITEMS_DB_NAME);

export const addCartItem = (item) => {
  if (!item)
    return new Promise((resolve, reject) =>
      reject("Oops. You're trying to add an empty item...")
    );

  return push(CART_ITEMS_DB, item);
};

export const onCartItemsChange = (callback) =>
  onValue(CART_ITEMS_DB, function (snapshot) {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }

    const snapshotVal = snapshot.val();
    const cartItems = Object.entries(snapshotVal);
    callback(cartItems);
  });

export const onRemoveItemHandler = (id) => {
  console.log("onRemoveItemHandler ", id);
  const loc = ref(FB_DB, `${CART_ITEMS_DB_NAME}/${id}`);
  remove(loc);
};
