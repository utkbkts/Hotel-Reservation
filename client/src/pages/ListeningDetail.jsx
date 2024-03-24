import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data.js";
import "../styles/listingdetail.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const ListeningDetail = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/properties/${listingId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  //!date range
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // gün farkını hesaplıyoruz 1gün

  //!submit rezervasyon
  const customerId = useSelector((state) => state.user._id);
  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/bookings/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingForm),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        toast.success(data.message);
        navigate(`/${customerId}/trips`);
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="listing-details">
      <div className="title">
        <h1>{listing?.title}</h1>
        <div></div>
      </div>

      <div className="photos">
        {listing?.listingPhotoPath?.map((item) => (
          <img
            src={`${process.env.REACT_APP_API_URL}/${item.replace(
              "public",
              ""
            )}`}
            alt="listing photo"
          />
        ))}
      </div>

      <h2>
        {listing?.type} in {listing?.city}, {listing?.province},{" "}
        {listing?.country}
      </h2>
      <p>
        {listing?.guest} guests - {listing?.BedRooms} bedroom(s) -{" "}
        {listing?.Beds} bed(s) - {listing?.BathRooms} bathroom(s)
      </p>
      <hr />

      <div className="profile">
        <img
          src={`${
            process.env.REACT_APP_API_URL
          }/${listing?.creator.profileImagePath.replace("public", "")}`}
        />
        <h3>
          Hosted by, {listing?.creator.firstname} {listing?.creator.lastname}
        </h3>
      </div>
      <hr />

      <h3>Description</h3>
      <p>{listing?.description}</p>
      <hr />

      <h3>{listing?.highlight}</h3>
      <p>{listing?.highlightDesc}</p>
      <hr />

      <div className="booking">
        <div>
          <h2>What this place offers?</h2>
          <div className="amenities">
            {listing?.amenities[0].split(",").map((item, index) => (
              <div className="facility" key={index}>
                <div className="facility_icon">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>How long do you want to stay?</h2>
          <div className="date-range-calendar">
            <DateRange ranges={dateRange} onChange={handleSelect} />
            {dayCount > 1 ? (
              <h2>
                ${listing?.price} x {dayCount} nights
              </h2>
            ) : (
              <h2>
                ${listing?.price} x {dayCount} night
              </h2>
            )}

            <h2>Total price: ${listing?.price * dayCount}</h2>
            <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
            <p>End Date: {dateRange[0].endDate.toDateString()}</p>

            <button className="button" type="submit" onClick={handleSubmit}>
              BOOKING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningDetail;
