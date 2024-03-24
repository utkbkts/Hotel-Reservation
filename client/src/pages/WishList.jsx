import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ListingCard from "../components/ListingCard";
import "../styles/list.scss";
const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <div>
      <div className="title-list">
        <h1>Wish List</h1>
      </div>
      {wishList.length <= 0 ? (
        <h1 className="title-booking">You don't have any favorites yet</h1>
      ) : (
        <div className="list">
          {wishList.map(
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

export default WishList;
