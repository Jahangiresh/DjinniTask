import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Favorites from "../componenets/Favorites";
import Loader from "../componenets/Loader";
import { AiFillHeart } from "react-icons/ai";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH__REQUEST":
      return { ...state, loading: true, error: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        product: action.payload,
      };

    default:
      return state;
  }
};

const Details = ({ istrue, setistrue }) => {
  const [{ product, loading }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
  });

  const params = useParams();
  const { id } = params;
  console.log(params.id);
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const resp = await axios.get(
          `https://testbackend.nc-one.com/image?id=${params.id}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: resp.data });
      } catch (error) {
        alert(error);
      }
    };
    getProduct();
  }, []);

  const addToFavorites = (prod) => {
    let favorite = JSON.parse(localStorage.getItem("favorites"));
    let _id = prod.id;

    let existedProd = favorite.find((x) => x.id === _id);

    if (!existedProd) {
      favorite.push(prod);
    } else {
      favorite.splice(favorite.indexOf(existedProd), 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorite));
    setistrue((current) => !current);
  };
  return loading ? (
    <Loader></Loader>
  ) : (
    <div className="details ">
      <div className="details__container myContainer">
        <div className="details__container__row row">
          <Favorites istrue={istrue} setistrue={setistrue} />

          <div className="details__container__row__right col-8 ">
            <div className="details__container__row__right__image col-4  ">
              <img
                src={`https://testbackend.nc-one.com${product.src}`}
                alt=""
              />
            </div>
            <div className="details__container__row__right__title col-8">
              <p>{product.name}</p>
              <div className="price__div">
                <span className="span__price">${product.price}</span>
                <span className="span__icon">
                  
                  <AiFillHeart
                    onClick={() => addToFavorites(product)}
                    className="add__to__favorites"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
