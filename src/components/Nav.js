import React, { useEffect, useState } from "react";
import axios from "../axios";
import OutsideClickHandler from "react-outside-click-handler";

import "./Nav.css";
const base_url = "https://image.tmdb.org/t/p/original/";

function Nav({ fetchUrl }) {
  const [show, handleShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const handlesearchChange = (event) => {
    setSearch(event.target.value);
  };

  let searchProducts = movies;
  if (search !== "")
    searchProducts = movies.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

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
  useEffect(() => {
    // if [], run once when the row loads, and dont run again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.table(searchProducts);

  const [hidden, setHidden] = useState(false);

  return (
    <header>
      <div className={`nav ${show && "nav__black"}`}>
        <img
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />

        <div className="content">
          <div className="search">
            <OutsideClickHandler
              onOutsideClick={() => {
                setHidden(false);
                setSearch("");
              }}
            >
              <input
                type="text"
                className="search__input"
                aria-label="search"
                placeholder="Search ..."
                value={search}
                onChange={handlesearchChange}
                onFocus={() => setHidden(!hidden)}
              />
            </OutsideClickHandler>
            <button className="search__submit" aria-label="submit search">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {hidden && (
          <ul className="row__posters__search">
            {search !== "" &&
              searchProducts.map((movie) => (
                <li className="menu__item">
                  <img
                    key={movie.id}
                    className="image"
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.name}
                  />
                  <div className="dec">
                    <p className="name" key={movie.id}>
                      {movie.name}
                    </p>
                    {/* <p className="date" key={movie.id}>
                    {movie.first_air_date}
                  </p> */}
                  </div>
                </li>
              ))}
          </ul>
        )}
        <img
          className="nav__avatar"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
      </div>
    </header>
  );
}

export default Nav;
