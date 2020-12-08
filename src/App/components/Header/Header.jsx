import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import "./header.css"; //щоб працював клас 'active'

//data
import routes from "../../data/routes";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink to={routes.home} activeClassName="active" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.movies} activeClassName="active">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
