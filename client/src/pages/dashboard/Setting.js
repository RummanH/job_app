import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow } from "../../components";

const initialState = { currentPassword: "", password: "", passwordConfirm: "" };

const Setting = () => {
  const { user, displayAlert, showAlert, changePassword, isLoading } =
    useAppContext();

  const [inputState, setInputState] = useState(initialState);

  const { currentPassword, password, passwordConfirm } = inputState;

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !password || !passwordConfirm) {
      displayAlert();
      return;
    }
    const changed = await changePassword({
      currentPassword,
      password,
      passwordConfirm,
    });

    if (changed) {
      setInputState(initialState);
    }
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Change password</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="password"
            name="currentPassword"
            labelText="current password"
            value={currentPassword}
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="password"
            labelText="new password"
            value={password}
            handleChange={handleChange}
          />

          <FormRow
            type="password"
            name="passwordConfirm"
            labelText="confirm password"
            value={passwordConfirm}
            handleChange={handleChange}
          />

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "please wait" : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Setting;
