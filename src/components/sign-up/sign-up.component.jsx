import React, { useState } from "react";

import "./sign-up.style.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserProfileDocument(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeDN = (event) => {
    setDisplayName(event.target.value);
  };

  const handleChangeEM = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeP = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeCP = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChangeDN}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChangeEM}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChangeP}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={confirmPassword}
          onChange={handleChangeCP}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
