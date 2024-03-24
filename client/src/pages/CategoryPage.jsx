import { useState, useEffect } from "react";
import "../styles/list.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return (
    <>
      <h1 className="title-list">{category} listings</h1>
      {listings.length <= 0 ? (
        <h1 className="title-booking">
          There are currently no resorts to show in this category
        </h1>
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
    </>
  );
};

export default CategoryPage;
