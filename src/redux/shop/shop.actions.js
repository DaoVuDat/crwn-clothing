import ShopActionTypes from "./shop.types";

export const updateCollection = (collectionMap) => {
  return {
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionMap,
  };
};
