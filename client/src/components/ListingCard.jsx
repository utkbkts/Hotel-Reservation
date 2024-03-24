import React, { useState } from "react";
import "../styles/card.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWishList } from "../redux/state";
import { toast } from "react-hot-toast";
const ListingCard = ({
  listingId,
  creator,
  listingPhotoPath,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  title,
  endDate,
  totalPrice,
  booking,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //!slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlider = (e) => {
    e.preventDefault();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPath.length) % listingPhotoPath.length
    );
  };

  const nextSlider = (e) => {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPath.length);
  };

  //!add to wishlist

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);
  const pathchWishList = async () => {
    try {
      if (user?._id !== creator._id) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${user?._id}/${listingId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.success === true) {
          dispatch(setWishList(data.data));
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        return;
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPath?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${process.env.REACT_APP_API_URL}/${photo?.replace(
                  "public",
                  ""
                )}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlider(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlider(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
          <button
            className="prev-button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlider(e);
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: "20px" }} />
          </button>
          <button
            className="next-button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlider(e);
            }}
          >
            <ArrowForwardIos sx={{ fontSize: "20px" }} />
          </button>
        </div>
        <div className="bottom">
          <h3 className="title">{title}</h3>
          <p className="desc">
            {" "}
            {city}, {province}, {country}
          </p>
          <span className="desc">{category}</span>
          {!booking ? (
            <>
              <p>{type}</p>
              <span className="price">
                ${price} <span className="pernight">per night</span>
              </span>
            </>
          ) : (
            <>
              <p>
                {startDate} - {endDate}
              </p>

              <span className="price">
                ${totalPrice} <span className="pernight">per night</span>
              </span>
            </>
          )}
          <button
            disabled={!user}
            className="favorite"
            onClick={(e) => {
              e.stopPropagation();
              pathchWishList();
            }}
          >
            {isLiked ? (
              <Favorite sx={{ color: "red" }} />
            ) : (
              <Favorite sx={{ color: "white" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
