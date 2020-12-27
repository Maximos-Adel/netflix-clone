import React, { useEffect, useState } from "react";

import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      {/* <input type="search" placeholder="Search ..." /> */}
      <img
        className="nav__avatar"
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="avatar"
      />
    </div>
  );
}

export default Nav;
