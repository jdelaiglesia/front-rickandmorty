import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "react-input-customizer";

import styled from "styled-components";

import "../styles/Form.css";

const Form = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = (event) => {
    switch (event.target.name) {
      case "email":
        const emailRegex = /\S+@\S+\.\S+/;
        emailRegex.test(event.target.value)
          ? setErrors({ ...errors, email: "" })
          : setErrors({ ...errors, email: "Email inválido." });
        break;
      case "password":
        const passwordRegex =
          /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/;
        passwordRegex.test(event.target.value)
          ? setErrors({ ...errors, password: "" })
          : setErrors({
              ...errors,
              password:
                "La password debe tener entre 6 y 10 caracteres, una mayúscula, una minúscula, un número y un caracter especial.",
            });
        break;
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    validate();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.login(userData);
  };

  return (
    <form className="loginView" onSubmit={handleSubmit}>
      <label className="formText" htmlFor="email">
        Email:{" "}
      </label>
      <input
        className="formInput"
        type="email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
      />
      {errors.email && <p>{errors.email}</p>}
      <label className="formText" htmlFor="password">
        Password:{" "}
      </label>
      <input
        className="formInput"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
      />
      {errors.password && <p>{errors.password}</p>}
      <button className="formButton" type="submit">
        Login
      </button>
    </form>
  );
};

export default Form;
