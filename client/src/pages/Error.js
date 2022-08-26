import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="Not found" />
        <h3>Oh Page not found!</h3>
        <p>It seems the page you're trying to find is not exist</p>
        <Link to="/">back to home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
