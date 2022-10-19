import React, { useState } from "react";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";

const Favorites = ({ istrue, setistrue }) => {
  let products = JSON.parse(localStorage.getItem("favorites"));

  const [favs, setFavs] = useState();

  useEffect(() => {
    setFavs(products);
  }, [istrue]);

  const removeHandler = (prod) => {
    let favorite = JSON.parse(localStorage.getItem("favorites"));
    let _id = prod.id;

    let existedProd = favorite.find((x) => x.id === _id);

    favorite.splice(favorite.indexOf(existedProd), 1);
    localStorage.setItem("favorites", JSON.stringify(favorite));
    setistrue((current) => !current);
  };
  return (
    <div className="productlist__container__row__left col-4 ">
      <div className="productlist__container__row__left__favorites">
        <span>Favorites</span>
        {favs &&
          favs.map((fav) => (
            <div
              key={fav.id}
              className="productlist__container__row__left__favorites__row row"
            >
              <div className="productlist__container__row__left__favorites__row__image col-4">
                <img src={`https://testbackend.nc-one.com${fav.src}`} alt="" />
              </div>
              <div className="productlist__container__row__left__favorites__row__title col-8">
                <p>{fav.name.slice(0, 20)}...</p>
                <div className="price__div">
                  <span className="span__price">${fav.price}</span>
                  <span className="span__icon">
                    <AiFillHeart
                      onClick={() => removeHandler(fav)}
                      className="add__to__favorites"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
