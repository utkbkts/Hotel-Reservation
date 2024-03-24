import { useEffect, useState } from "react";
import "../styles/list.scss";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);
  console.log(tripList);
  return (
    <>
      <h1 className="title-list">Your Trip List</h1>
      {tripList.length <= 0 ? (
        <h1 className="title-booking">You don't have any appointments yet</h1>
      ) : (
        <div className="list">
          {tripList?.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                listingId={listingId?._id}
                creator={hostId?._id}
                listingPhotoPath={listingId?.listingPhotoPath}
                city={listingId?.city}
                province={listingId?.province}
                country={listingId?.country}
                category={listingId?.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default TripList;
