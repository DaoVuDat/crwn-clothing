import React, { useEffect, useRef } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

function App() {
  const dispatch = useDispatch();
  const { currentUser, collectionArray } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
      // collectionArray: selectCollectionsForPreview,
    })
  );

  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
      }

      // addCollectionAndDocuments(
      //   "collections",
      //   collectionArray.map(({ title, items }) => ({ title, items }))
      // );
    });

    return () => {
      unsubscribeFromAuth.current();
    };
  }, [dispatch, collectionArray]);

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            exact
            render={() => {
              return currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
