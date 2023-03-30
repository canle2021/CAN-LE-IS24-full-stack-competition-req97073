import React from "react";
import "../styles/header.css";
import Button from "../components/button";
const Header = () => {
  return (
    <div className="main">
      <p className="headerTitle">Products tracking</p>
      <Button text="Add product"></Button>
    </div>
  );
};

export default Header;
