import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import "./cart-icon.style.scss";

const CartIcon = () => {
  const dispatch = useDispatch();
  // memoized "selectCartItemsCount" use "selectCartItems" that uses "selectCart"
  // const itemCount = useSelector((state) => selectCartItemsCount(state));
  const { itemCount } = useSelector(
    createStructuredSelector({
      itemCount: selectCartItemsCount,
    })
  );

  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
