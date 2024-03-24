import { categories, facilities, types } from "../data";
import "../styles/createlistening.scss";
import variables from "../styles/variables.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UploadFile from "../components/UploadFile";
import { toast } from "react-hot-toast";
const CreateList = () => {
  const [category, setCategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };
  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };
  //!countrooms
  const [guest, setGuest] = useState(1);
  const [BedRooms, setBedRooms] = useState(1);
  const [Beds, setBeds] = useState(1);
  const [BathRooms, setBathRooms] = useState(1);

  //!çoklu kategori seçmek

  const [amenities, setAmanetites] = useState([]);

  const handleSelectAmentites = (facility) => {
    if (amenities.includes(facility)) {
      setAmanetites((prevFilter) =>
        prevFilter.filter((prevAmentites) => prevAmentites !== facility)
      );
    } else {
      setAmanetites((prevAmentites) => [...prevAmentites, facility]);
    }
  };

  //!submit
  const creatorid = useSelector((state) => state.user._id);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("creator", creatorid);
      formdata.append("category", category);
      formdata.append("type", type);
      formdata.append("streetAddress", formLocation.streetAddress);
      formdata.append("city", formLocation.city);
      formdata.append("country", formLocation.country);
      formdata.append("aptSuite", formLocation.aptSuite);
      formdata.append("province", formLocation.province);
      formdata.append("guest", guest);
      formdata.append("BedRooms", BedRooms);
      formdata.append("Beds", Beds);
      formdata.append("BathRooms", BathRooms);
      formdata.append("amenities", amenities);
      formdata.append("title", formDescription.title);
      formdata.append("description", formDescription.description);
      formdata.append("highlight", formDescription.highlight);
      formdata.append("highlightDesc", formDescription.highlightDesc);
      formdata.append("price", formDescription.price);

      photos.forEach((photo) => {
        formdata.append("listingPhotos", photo);
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/properties/create`,
        {
          method: "POST",
          body: formdata,
        }
      );
      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guest > 1 && setGuest(guest - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guest}</p>
                  <AddCircleOutline
                    onClick={() => setGuest(guest + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      BedRooms > 1 && setBedRooms(BedRooms - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{BedRooms}</p>
                  <AddCircleOutline
                    onClick={() => setBedRooms(BedRooms + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      Beds > 1 && setBeds(Beds - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{Beds}</p>
                  <AddCircleOutline
                    onClick={() => setBeds(Beds + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      BathRooms > 1 && setBathRooms(BathRooms - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{BathRooms}</p>
                  <AddCircleOutline
                    onClick={() => setBathRooms(BathRooms + 1)}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmentites(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>

            <UploadFile photos={photos} setPhotos={setPhotos} />

            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />
              <p>Now, set your PRICE</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateList;
