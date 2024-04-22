import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FaHeart } from "react-icons/fa";
import "@fontsource/la-belle-aurore";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [visibleVenues, setVisibleVenues] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://api.noroff.dev/api/v1/holidaze/venues"
        );
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVenues();
  }, []);

  useEffect(() => {
    setVisibleVenues(venues.slice(0, visibleCount));
  }, [venues, visibleCount]);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleVenues.map((venue) => (
          <Link key={venue.id} to={`/venue/${venue.id}`}>
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <FaHeart className="absolute top-2 right-2 text-red-500 cursor-pointer" />
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
                  <p className="text-gray-700">Price: {venue.price}</p>
                  <p className="text-gray-700">Rating: {venue.rating}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleVenues.length < venues.length && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Venues;
