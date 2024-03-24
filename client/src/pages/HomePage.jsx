import React from "react";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listenings from "../components/Listenings";

const HomePage = () => {
  return (
    <div>
      <Slide />
      <Categories />
      <Listenings />
    </div>
  );
};

export default HomePage;
