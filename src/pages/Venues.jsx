import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FaHeart } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Facilities from "../components/facilities";
import "@fontsource/la-belle-aurore";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checking, setChecking] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [totalGuests, setTotalGuests] = useState(1);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues?sort=created&sortOrder=desc"
        );
        const data = await response.json();
        setVenues(data);
        setFilteredVenues(data);
        setVisibleVenues(data.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVenues();
  }, [visibleCount]);

  useEffect(() => {
    setFilteredVenues(
      venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [venues, searchTerm]);

  useEffect(() => {
    setVisibleVenues(filteredVenues.slice(0, visibleCount));
  }, [filteredVenues, visibleCount]);

  const handleSearchChange = () => {
    const filtered = venues.filter((venue) => {
      const matchesChecking =
        !checking || (venue.checking && venue.checking.includes(checking));
      const matchesCheckout =
        !checkout || (venue.checkout && venue.checkout.includes(checkout));
      const matchesGuests = venue.adults + venue.kids <= totalGuests;
      const matchesName = venue.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesChecking && matchesCheckout && matchesGuests && matchesName;
    });

    setFilteredVenues(filtered);
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <div className="container mx-auto">
      <div className="mt-6">
        <Facilities />
      </div>
      <div className="flex border mt-10 mb-4 flex-wrap gap-3">
        <input
          type="text"
          placeholder="Where are you going?"
          className="flex w-42 p-2  bg-white text-black ml-4 md:w-80 lg:flex-start"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="ml-4">
          <DatePicker
            selected={checking}
            onChange={(date) => setChecking(date)}
            placeholderText={"Checkin date "}
            className="p-2  border-l border-black  bg-white text-black"
          />
        </div>
        <div className="ml-4">
          <DatePicker
            selected={checkout}
            onChange={(date) => setCheckout(date)}
            placeholderText="Checkout date"
            className="p-2 border-l border-black  bg-white text-black"
          />
        </div>
        <div className="ml-4 flex items-center">
          <select
            value={totalGuests}
            onChange={(e) => setTotalGuests(parseInt(e.target.value))}
            className="p-2 border-l border-black bg-white text-black w-48"
          >
            {[...Array(11)].map((_, i) => (
              <option key={i} value={i}>
                {i} Guest{i !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
        <button
          className="flex text-xl font-bold bg-white text-black"
          onClick={handleSearchChange}
        ></button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {visibleVenues.map((venue) => (
          <Link key={venue.id} to={`/venue/${venue.id}`}>
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <FaHeart className="absolute top-2 right-2 text-inherit opacity-25 cursor-pointer" />
              <div className="h-48 overflow-hidden">
                <img
                  src={venue.media[0]}
                  alt={venue.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-l font-semibold mb-2">{venue.name}</h2>
                <div className="flex justify-between items-center">
                  <p className="text-black">Price: {venue.price}</p>
                  <p className="text-black">Rating: {venue.rating}</p>
                  <p className="text-black">Location: {venue.location.city}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleVenues.length < filteredVenues.length && (
        <div className="flex justify-center mt-8 font-thin">
          <button
            className="bg-gray-50 text-black px-4 py-2 rounded-full h-28 w-28 shadow-md hover:bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 mb-5"
            onClick={handleViewMore}
          >
            VIEW MORE{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Venues;
