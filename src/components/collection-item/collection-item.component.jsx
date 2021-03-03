import React from "react";
import { useDispatch } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.styles.scss";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price } = item;

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        inverted
        className="custom-button"
        onClick={() => dispatch(addItem(item))}
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
