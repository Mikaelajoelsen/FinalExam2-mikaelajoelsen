import { useEffect, useState } from "react";
import GoogleMap from "../components/map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import Review from "../components/review";
import PropTypes from "prop-types";

const initialVenueState = {
  id: "",
  name: "",
  description: "",
  media: [],
  price: 0,
  maxGuests: 0,
  rating: 0,
  created: "",
  updated: "",
  meta: {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  },
  location: {
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  },
};

const VenuePage = ({ onBook }) => {
  const [venue, setVenue] = useState(initialVenueState);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalGuests, setTotalGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rated, setRated] = useState(0);
  const accessToken = localStorage.getItem("access_token");

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  VenuePage.propTypes = {
    onBook: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const pathSegments = window.location.pathname.split("/");
        const venueId = pathSegments[pathSegments.length - 1];
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`, // Legg til et komma her
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVenue(data);
        } else {
          console.error(`Failed to fetch venue. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching venue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, []);

  useEffect(() => {
    const handleTotalPrice = () => {
      if (checkInDate && checkOutDate) {
        const nights = Math.ceil(
          (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
        );
        const price = venue.price;
        setTotalPrice(nights * price * totalGuests);
      }
    };

    handleTotalPrice();
  }, [checkInDate, checkOutDate, totalGuests, venue.price]);

  const handleReserveClick = () => {
    console.log("Reservation clicked!");
    if (onBook) {
      onBook(venue);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const matchesGuests = venue.maxGuests >= totalGuests;

  return (
    <div className="flex flex-col items-center gap-6 ">
      <div className="w-full max-w-4xl rounded-xl text-gray-700 p-6">
        {venue && (
          <img
            className="object-cover w-full h-96 mb-4"
            src={venue?.media?.[0]}
            alt=""
          />
        )}
        <div className="flex items-center gap-2 font-bold text-pink-900 mb-5">
          {rated}.5
          <Rating value={4} onChange={(value) => setRated(value)} />
        </div>
        <Typography color="blue-gray" className="font-medium text-black">
          Based on 202 Reviews
        </Typography>
        <div className="flex flex-col md:flex-row justify-between">
          {venue && (
            <div className="md:w-1/2 md:pr-4">
              <h1 className="text-5xl font-bold mb-2 mt-8 text-black">
                {venue.name}
              </h1>
              <p className="mb-2 text-black">Created: {venue.created}</p>
              <p className="mb-2 text-black">Updated: {venue.updated}</p>
              <p className="mb-2 text-black">Info: {venue.description}</p>
              <p className="mb-2 text-black">Rating: {venue.rating}</p>
              <p className="mb-2 text-gray-500">
                Price: ${venue.price} per night
              </p>
              <p className="mb-2 text-gray-500">
                Max Guests: {venue.maxGuests}
              </p>
              {venue.location && (
                <p className="mb-2 text-gray-500">
                  Address: {venue.location.address}, {venue.location.city},{" "}
                  {venue.location.country}
                </p>
              )}
              {venue.meta && (
                <p className="mb-2 text-gray-500">
                  Facilities:
                  {venue.meta.id ? ` ${venue.meta.id},` : ""}
                  {venue.meta.breakfast ? " Breakfast," : ""}
                  {venue.meta.parking ? " Parking," : ""}
                  {venue.meta.pets ? " Pets," : ""}
                  {venue.meta.wifi ? " Wifi" : ""}
                </p>
              )}
            </div>
          )}
          <div className="md:w-1/2">
            <div className="rounded-xl bg-white text-gray-700 shadow-lg p-6">
              <div className="flex flex-col justify-center ">
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInDateChange}
                  placeholderText="SELECT CHECKIN"
                  className=" w-full py-2 px-4 mb-4 border rounded-md"
                />
                <DatePicker
                  selected={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  placeholderText="SELECT CHECKOUT"
                  className="w-full py-2 px-4 mb-4 border rounded-md"
                />
              </div>
              <div className="flex items-center">
                <select
                  value={totalGuests}
                  onChange={(e) => setTotalGuests(parseInt(e.target.value))}
                  className="p-2 border border-gray-200 bg-inherit w-full"
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>
                      {i} Guest{i !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-center text-2xl font-semibold mb-4 mt-6">
                Price: ${venue.price} per night
              </p>
              <p className="text-center text-2xl font-semibold mb-4">
                Total Price: ${totalPrice}
              </p>
              <button
                className="block w-full select-none rounded-lg bg-amber-50 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-black shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleReserveClick}
                disabled={!matchesGuests}
              >
                {matchesGuests ? "Book" : "Not enough capacity"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Review />
        </div>
      </div>
      <div className="w-full">
        <GoogleMap lat={venue.location.lat} lng={venue.location.lng} />
      </div>
    </div>
  );
};

const App = () => {
  const handleBook = (venue) => {
    console.log("Booking:", venue);
    // Implement booking logic here
  };

  return (
    <div>
      <VenuePage onBook={handleBook} />
    </div>
  );
};

export default App;
