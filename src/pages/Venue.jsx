import { useEffect, useState } from "react";
import GoogleMap from "../components/map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";
import PropTypes from "prop-types";
import {
  FaArrowLeft,
  FaArrowRight,
  FaWifi,
  FaParking,
  FaCoffee,
  FaDog,
} from "react-icons/fa";

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
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllBookings, setShowAllBookings] = useState(false);
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
          if (!data.owner.avatar) {
            fetchRandomImage();
          }
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

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        `https://source.unsplash.com/random/800x600/?nature,water`
      );

      if (response.ok) {
        const imageUrl = response.url;
        setVenue((prevVenue) => ({
          ...prevVenue,
          owner: {
            ...prevVenue.owner,
            avatar: imageUrl,
          },
        }));
      } else {
        console.error("Failed to fetch random image.");
      }
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === venue.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? venue.media.length - 1 : prevIndex - 1
    );
  };

  const handleToggleBookings = () => {
    setShowAllBookings((prevState) => !prevState);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText && reviewRating) {
      const newReview = {
        text: reviewText,
        rating: reviewRating,
        date: new Date().toISOString(),
        likes: 0,
      };
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      setReviewText("");
      setReviewRating(0);
    } else {
      console.error("Review text or rating is missing");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const matchesGuests = venue.maxGuests >= totalGuests;

  const bookingsToShow = showAllBookings
    ? venue.bookings
    : venue.bookings.slice(0, 1);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full max-w-4xl rounded-xl text-gray-700 p-6">
        {venue.media.length > 0 && (
          <div className="relative mb-4">
            <img
              className="object-cover w-full h-96 rounded-lg"
              src={venue.media[currentImageIndex]}
              alt={`${venue.name} image ${currentImageIndex + 1}`}
            />
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full"
              onClick={handlePrevImage}
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full"
              onClick={handleNextImage}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 font-bold text-pink-600 mb-5">
          {rated}.5
          <Rating value={rated} onChange={(value) => setRated(value)} />
        </div>
        <Typography color="blue-gray" className="font-medium text-black">
          Based on 202 Reviews
        </Typography>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 md:pr-4">
            <h1 className="text-3xl font-bold mb-2 mt-8 text-black">
              {venue.name}
            </h1>
            <p className="mb-2 text-black">Info: {venue.description}</p>
            <p className="mb-2 text-black">Rating: {venue.rating}</p>
            <p className="mb-2 text-black">Price: {venue.price}kr per night</p>
            <p className="mb-2 text-black">Max Guests: {venue.maxGuests}</p>
            {venue.location && (
              <p className="mb-2 text-black">
                Address: {venue.location.address}, {venue.location.city},{" "}
                {venue.location.country}
              </p>
            )}
            {venue.meta && (
              <div className="mb-2 text-black flex flex-wrap space-x-5">
                {venue.meta.wifi && (
                  <div className="flex items-center">
                    <FaWifi className="mr-1" /> Wifi
                  </div>
                )}
                {venue.meta.parking && (
                  <div className="flex items-center">
                    <FaParking className="mr-1" /> Parking
                  </div>
                )}
                {venue.meta.breakfast && (
                  <div className="flex items-center">
                    <FaCoffee className="mr-1" /> Breakfast
                  </div>
                )}
                {venue.meta.pets && (
                  <div className="flex items-center">
                    <FaDog className="mr-1" /> Pets Allowed
                  </div>
                )}
              </div>
            )}
            {bookingsToShow.map((booking, index) => (
              <div key={index} className="mb-2 text-black">
                <p>Booking {index + 1}:</p>
                <p>ID: {booking.id}</p>
                <p>Date From: {booking.dateFrom}</p>
                <p>Date To: {booking.dateTo}</p>
                <p>Guests: {booking.guests}</p>
              </div>
            ))}
            {venue.bookings.length > 1 && (
              <button
                onClick={handleToggleBookings}
                className="px-4 py-2 mt-4 bg-stone-100 hover:bg-stone-200 text-black rounded-md"
              >
                {showAllBookings ? "View Less" : "View More"}
              </button>
            )}
          </div>

          <div className="md:w-1/2">
            <div className="rounded-xl bg-white text-black shadow-lg p-6">
              <div className="flex flex-col justify-center">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  placeholderText="SELECT CHECKIN"
                  className="w-full py-2 px-4 mb-4 border rounded-md"
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
                Price: {venue.price}kr per night
              </p>
              <p className="text-center text-2xl font-semibold mb-4">
                Total Price: {totalPrice}kr
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
        <div className="rounded-xl max-w-96 bg-white text-black shadow-lg p-6 mb-4">
          <div className="mb-2 text-black font-bold">Owner Information</div>
          <img
            src={
              venue.owner.avatar ||
              "https://source.unsplash.com/random/800x600/?person"
            }
            alt={venue.owner.name}
            className="w-12 h-12 rounded-full mr-3 mb-3 md:mb-0 md:mr-0"
          />
          <div className="flex flex-wrap items-center mb-2">
            <div className="flex flex-col">
              <p className="mb-1">Owner: {venue.owner.name}</p>
              <p className="mb-1">Email: {venue.owner.email}</p>
            </div>
          </div>
          <p className="mb-2 text-black">Created: {venue.created}</p>
          <p className="mb-2 text-black">Updated: {venue.updated}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-thin mb-4 mt-2">Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <div className="mb-4">
              <textarea
                className="w-full p-4 border rounded-md"
                rows="4"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <span className="mr-2 text-lg">Rating:</span>
              <Rating
                value={reviewRating}
                onChange={(value) => setReviewRating(value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-md"
            >
              Submit Review
            </button>
          </form>
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md">
                <div className="flex flex-wrap items-center mb-2">
                  <Rating value={review.rating} readOnly />
                  <span className="ml-2 text-gray-600">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
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
