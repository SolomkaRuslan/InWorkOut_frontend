import React from "react";
import { NavLink } from "react-router-dom";
import { ImExit } from "react-icons/im";
import "./MainNavbar.css";

const MainNavbar = ({ logedIn, logout }) => {
  return (
    <div className="navbar">
      <div className="navbar--container">
        <div className="navbar--loggo">
          <NavLink to="/">InWorkOut</NavLink>
        </div>

        <nav className="navbar--navigation">
          <ul className="navbar--navigation__list">
            <li className="navbar--navigation__listitem">
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            {!logedIn ? (
              <li className="navbar--navigation__listitem">
                <NavLink to="/auth">Sign In</NavLink>
              </li>
            ) : (
              <React.Fragment>
                <li className="navbar--navigation__listitem">
                  <NavLink to="/profile">Exercises</NavLink>
                </li>
                <li className="navbar--navigation__listitem">
                  <NavLink to="/workouts">Workouts</NavLink>
                </li>
                <li className="navbar--navigation__listitem">
                  <NavLink to="/statistics">Statistics</NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>

        <div className="navbar--auth">
          {logedIn ? (
            <React.Fragment>
              <span>{sessionStorage.getItem("name") || "User"}</span>
              <button className="btn btn-primary" onClick={() => logout()}>
                <div className="row">
                  <ImExit />
                  Log Out
                </div>
              </button>
            </React.Fragment>
          ) : (
            <span>Guest</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
