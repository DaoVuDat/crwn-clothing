import React from "react";
// import "./homepage.style.scss";

import { HomePageContainer } from "./homepage.styles";
import Directory from "../../components/directory/directory.component";

const HomePage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
