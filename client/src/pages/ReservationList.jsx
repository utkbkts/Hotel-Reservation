import { useEffect, useState } from "react";
import "../styles/list.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();
  const getReservationList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/reservation`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);
  console.log(reservationList);

  return (
    <>
      <h1 className="title-list">Your Reservation List</h1>
      {reservationList.length <= 0 ? (
        <h1 className="title-booking">You don't have any Reservation yet</h1>
      ) : (
        <div className="list">
          {reservationList?.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                key={listingId._id} // added key prop for each ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPath={listingId.listingPhotoPath}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
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

export default ReservationList;
