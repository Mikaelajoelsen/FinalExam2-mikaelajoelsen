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
  owner: {
    name: "",
    email: "",
    avatar: "",
  },
  bookings: [],
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

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const pathSegments = window.location.pathname.split("/");
        const venueId = pathSegments[pathSegments.length - 1];
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_owner=true&_bookings=true`,
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
  }, [accessToken]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (checkInDate && checkOutDate) {
        const nights = Math.ceil(
          (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
        );
        const price = venue.price;
        setTotalPrice(nights * price * totalGuests);
      }
    };

    calculateTotalPrice();
  }, [checkInDate, checkOutDate, totalGuests, venue.price]);

  const handleReserveClick = async () => {
    try {
      const requestBody = {
        dateFrom: checkInDate,
        dateTo: checkOutDate,
        guests: totalGuests,
        venueId: venue.id,
      };

      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/bookings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.status !== 201) {
        if (data.errors && data.errors.length > 0) {
          throw new Error(data.errors[0].message);
        } else {
          throw new Error("An error occurred while making the reservation.");
        }
      }

      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, data])
      );

      if (onBook) {
        onBook(data);
      }
    } catch (error) {
      console.error("Error making reservation:", error);
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
            src={venue.media[0]}
            alt={venue.name}
          />
        )}
        <div className="flex items-center gap-2 font-bold text-pink-600 mb-5">
          {rated}.5
          <Rating value={4} onChange={(value) => setRated(value)} />
        </div>
        <Typography color="blue-gray" className="font-medium text-black">
          Based on 202 Reviews
        </Typography>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 md:pr-4">
            <h1 className="text-3xl font-bold mb-2 mt-8 text-black">
              {venue.name}
            </h1>
            <p className="mb-2 text-black">Owner: {venue.owner.name}</p>
            <p className="mb-2 text-black">Email: {venue.owner.email}</p>
            <p className="mb-2 text-black">Created: {venue.created}</p>
            <p className="mb-2 text-black">Updated: {venue.updated}</p>
            <p className="mb-2 text-black">Info: {venue.description}</p>
            <p className="mb-2 text-black">Rating: {venue.rating}</p>
            <p className="mb-2 text-black">Price: ${venue.price} per night</p>
            <p className="mb-2 text-black">Max Guests: {venue.maxGuests}</p>
            {venue.location && (
              <p className="mb-2 text-black">
                Address: {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </p>
            )}
            {venue.meta && (
              <p className="mb-2 text-black">
                Facilities:
                {venue.meta.breakfast ? " Breakfast," : ""}
                {venue.meta.parking ? " Parking," : ""}
                {venue.meta.pets ? " Pets," : ""}
                {venue.meta.wifi ? " Wifi" : ""}
              </p>
            )}
            {venue.bookings &&
              venue.bookings.map((booking, index) => (
                <div key={index} className="mb-2 text-black">
                  <p>Booking {index + 1}:</p>
                  <p>ID: {booking.id}</p>
                  <p>Date From: {booking.dateFrom}</p>
                  <p>Date To: {booking.dateTo}</p>
                  <p>Guests: {booking.guests}</p>
                  <p>Created: {booking.created}</p>
                  <p>Updated: {booking.updated}</p>
                </div>
              ))}
          </div>

          <div className="md:w-1/2">
            <div className="rounded-xl bg-white text-black shadow-lg p-6">
              <div className="flex flex-col justify-center ">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  placeholderText="SELECT CHECKIN"
                  className=" w-full py-2 px-4 mb-4 border rounded-md"
                />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
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
                className="block w-full select-none rounded-lg bg-stone-50 py-3.5 px-7 text-center align-middle font-sans text-sm font-thin uppercase text-pink-800 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

VenuePage.propTypes = {
  onBook: PropTypes.func.isRequired,
};

const App = () => {
  const handleBook = (booking) => {
    console.log("Booking:", booking);
  };

  return (
    <div>
      <VenuePage onBook={handleBook} />
    </div>
  );
};

export default App;
