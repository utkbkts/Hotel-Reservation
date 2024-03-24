import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CreateList from "./pages/CreateList";
import ListeningDetail from "./pages/ListeningDetail";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createlist" element={<CreateList />} />
        <Route path="/properties/:listingId" element={<ListeningDetail />} />
        <Route path="/:userId/trips" element={<TripList />} />
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<PropertyList />} />
        <Route
          path="/properties/category/:category"
          element={<CategoryPage />}
        />
        <Route path="/:userId/reservation" element={<ReservationList />} />{" "}
        <Route path="/properties/search/:search" element={<SearchPage />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
};

export default Home;
