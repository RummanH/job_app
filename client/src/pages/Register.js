import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FormRow, Logo, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
    useAppContext();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const googleButtonClick = () => {
    console.log("Google Click");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, passwordConfirm, isMember } = values;
    if (
      !email ||
      !password ||
      (!isMember && !name) ||
      (!isMember && !passwordConfirm)
    ) {
      displayAlert({ type: "danger", text: "Please provide all values!" });
      return;
    }
    if (isMember) {
      loginUser({ email, password });
    } else {
      registerUser({ name, email, password, passwordConfirm });
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            name="name"
            value={values.name}
            type="text"
            handleChange={handleChange}
          />
        )}
        <FormRow
          name="email"
          value={values.email}
          type="email"
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          value={values.password}
          type="password"
          handleChange={handleChange}
        />
        {!values.isMember && (
          <FormRow
            labelText="Confirm password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            type="password"
            handleChange={handleChange}
          />
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p className="center">Or</p>
        <button
          onClick={googleButtonClick}
          type="button"
          className="btn btn-block"
          style={{ backgroundColor: "#dd4b39", color: "white" }}
        >
          Login with google
        </button>
        <p>
          {values.isMember ? "Don't have account?" : "Already have an account?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
