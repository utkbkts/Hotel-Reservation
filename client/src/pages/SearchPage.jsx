import React, { useEffect } from "react";
import "../styles/list.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../components/ListingCard";
const SearchPage = () => {
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  const getSearchListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/properties/search/${search}`,
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
    getSearchListings();
  }, [search]);
  return (
    <div>
      <div className="title-list">
        <h1>{search}</h1>
      </div>
      {listings?.length <= 0 ? (
        <h1 className="title-booking">You don't have any favorites yet</h1>
      ) : (
        <div className="list">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPath,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
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
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
