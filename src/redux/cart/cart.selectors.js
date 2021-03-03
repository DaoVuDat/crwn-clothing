import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

// memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((accumulatedQuantity, cartItem) => {
      return accumulatedQuantity + cartItem.quantity;
    }, 0)
);
