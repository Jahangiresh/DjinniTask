import React, { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import axios from "axios";
import "./productlist.scss";
import { AiFillHeart } from "react-icons/ai";
import Favorites from "../componenets/Favorites";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../componenets/Loader";
import { Link, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH__REQUEST":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };

    default:
      return state;
  }
};

const ProductList = ({ istrue, setistrue }) => {
  const [{ products, loading }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
  });

  useEffect(() => {
    if (localStorage.getItem("favorites") === null) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  }, []);

  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resp = await axios.get("https://testbackend.nc-one.com/image");
        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (error) {
        alert(error);
      }
    };
    getProduct();
  }, [loading, products]);

  const addToFavorites = (prod) => {
    let favorite = JSON.parse(localStorage.getItem("favorites"));
    let _id = prod.id;

    let existedProd = favorite.find((x) => x.id === _id);

    if (!existedProd) {
      toast.success("Product added to basket !");
      favorite.push(prod);
    } else {
      favorite.splice(favorite.indexOf(existedProd), 1);
      toast.error("product removed from basket !");
    }
    localStorage.setItem("favorites", JSON.stringify(favorite));

    setistrue((current) => !current);
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <div className="productlist ">
      <div className="productlist__container myContainer">
        <div className="productlist__container__row row">
          <Favorites istrue={istrue} setistrue={setistrue} />
          <div className="productlist__container__row__right col-8 ">
            {products &&
              products.map((product) => (
                <div
                  key={product.id}
                  className="productlist__container__row__right__product col-3"
                >
                  <div
                    // onClick={() => navigate(`details/${product.id}`)}
                    className="productlist__container__row__right__product__image"
                  >
                    <Link to={`details/${product.id}`}>
                      <img
                        src={`https://testbackend.nc-one.com${product.src}`}
                        alt={product.name}
                      />
                    </Link>
                  </div>
                  <div className="productlist__container__row__right__product__name">
                    <p>{product.name}</p>
                  </div>
                  <div className="productlist__container__row__right__product__price ">
                    <span className="span__price">${product.price}</span>
                    <span className="span__icon">
                      <AiFillHeart
                        key={product.id}
                        onClick={() => addToFavorites(product)}
                        // className={
                        //   favs.some((e) => e.id === product.id)
                        //     ? "add__to__favorites__active"
                        //     : "add__to__favorites__disactive"
                        // }
                      />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductList;
