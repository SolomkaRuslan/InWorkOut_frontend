import React, { useState } from "react";

import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY, CREATE_USER } from "../data/graphqlQueries";

import useForm from "../hooks/useForm";
import useNotification from "../hooks/useNotification";
import AuthForm from "../components/AuthForm/AuthForm";
import Spiner from "../helpers/Spiner/Spiner";

import "./AuthPage.css";

const AuthPage = ({ login }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [loginForm, changeLoginForm] = useForm({ email: "", password: "" });
  const [registerForm, changeRegisterForm] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const displayNotification = useNotification();

  const [loginQuery, loginQueryInfo] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: (data) => {
      console.log("Loggin In");
      console.log(data);
      login(data.login.token, data.login.name);
    },
    onError: (err) => {
      displayNotification("ERROR", err.message);
    },
  });
  const [creatUsereMutation, createUserInfo] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("Registering In");
      setShowLoginForm(true);
      displayNotification("GOOD", `Registered user ${data.createUser}`);
    },
    onError: (err) => {
      displayNotification("ERROR", err.message);
    },
  });

  console.log("AuthPage rendered");

  const demoAccount = () => {
    loginQuery({
      variables: {
        loginLoginInput: {
          email: "tester@1.com",
          password: "testerqwe123",
        },
      },
    });
  };

  return (
    <div className="main--container">
      <div className="auth-page">
        <div className="auth-page__content">
          <div className="center-container">
            <div className="auth-spiner-holder">
              {loginQueryInfo.loading || createUserInfo.loading ? (
                <Spiner />
              ) : (
                ""
              )}
            </div>

            <button
              className={`block auth-block login ${
                showLoginForm ? "block-in" : "block-out"
              }`}
              onClick={() => {
                if (!showLoginForm) setShowLoginForm(true);
              }}
            >
              Go to
              <br />
              Login
            </button>
            <button
              className={`block auth-block register ${
                showLoginForm ? "block-out" : "block-in"
              }`}
              onClick={() => {
                if (showLoginForm) setShowLoginForm(false);
              }}
            >
              Go to Register
            </button>

            {showLoginForm ? (
              <AuthForm
                title="Welcome"
                values={loginForm}
                handleSubmit={loginQuery}
                submitInputName="loginLoginInput"
                submitBtnLabel="Sign In"
              >
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginForm.email}
                  onChange={changeLoginForm}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password}
                  onChange={changeLoginForm}
                />
                <button
                  className="tester-login-button"
                  type="button"
                  onClick={() => {
                    demoAccount();
                  }}
                >
                  Use demo account
                </button>
              </AuthForm>
            ) : (
              <AuthForm
                title="Create an Account"
                values={registerForm}
                handleSubmit={creatUsereMutation}
                submitInputName="createUserInput"
                submitBtnLabel="Register"
              >
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={registerForm.name}
                  onChange={changeRegisterForm}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={registerForm.email}
                  onChange={changeRegisterForm}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerForm.password}
                  onChange={changeRegisterForm}
                />
              </AuthForm>
            )}

            <div className="block block1" />
            <div className="block block2" />
            <div className="block block3" />
            <div className="block block4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
