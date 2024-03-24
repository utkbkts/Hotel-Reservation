import { useEffect, useState } from "react";
import { categories } from "../data.js";
import "../styles/listening.scss";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state.js";
import ListingCard from "./ListingCard.jsx";
const Listenings = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const getListining = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${process.env.REACT_APP_API_URL}/properties?category=${selectedCategory}`
          : `${process.env.REACT_APP_API_URL}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListining();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
      <div className="listings">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPath,
            city,
            province,
            country,
            title,
            category,
            type,
            price,
            booking = false,
          }) => (
            <>
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPath={listingPhotoPath}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                title={title}
              />{" "}
            </>
          )
        )}
      </div>
    </>
  );
};

export default Listenings;
