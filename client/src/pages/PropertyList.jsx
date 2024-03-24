import "../styles/list.scss";
import { useDispatch, useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <>
      <h1 className="title-list">Your Property List</h1>
      {propertyList.length <= 0 ? (
        <h1 className="title-booking">You don't have any Property yet</h1>
      ) : (
        <div className="list">
          {propertyList?.map(
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

export default PropertyList;
