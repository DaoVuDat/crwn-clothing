import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import { updateCollection } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, updateCollections }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = firestore.collection("collections");

    collectionRef.get().then((snapshot) => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionMap);
      setLoading(false);
    });

    // unsubcribeFromSnapShot.current = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    //     updateCollections(collectionMap);
    //     setLoading(false);
    //   }
    // );

    return () => {};
  }, [updateCollections]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionsMap) =>
      dispatch(updateCollection(collectionsMap)),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
