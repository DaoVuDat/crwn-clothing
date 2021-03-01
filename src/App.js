import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    unsubscribeFromAuth.current = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // console.log(user);
    });

    return () => {
      unsubscribeFromAuth.current();
    };
  }, []);

  return (
    <div>
      <Router>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
