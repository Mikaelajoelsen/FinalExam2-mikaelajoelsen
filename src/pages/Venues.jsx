import { useState, useEffect } from "react";

const Venues = () => {
  const [venues, setVenues] = useState([]);

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white shadow-md rounded p-4">
            <img
              src={venue.media[0]}
              alt={venue.name}
              className="w-full h-32 object-cover mb-2"
            />
            <h2 className="text-lg font-bold mb-2">{venue.name}</h2>
            <p className="text-gray-700">{venue.description}</p>
            <p className="text-gray-700">Price: {venue.price}</p>
            <p className="text-gray-700">Max Guests: {venue.maxGuests}</p>
            <p className="text-gray-700">Rating: {venue.rating}</p>
            <p className="text-gray-700">
              Location: {venue.location.address}, {venue.location.city},{" "}
              {venue.location.zip}, {venue.location.country}
            </p>
            <p className="text-gray-700">
              WiFi: {venue.meta.wifi ? "Available" : "Not Available"}
            </p>
            <p className="text-gray-700">
              Parking: {venue.meta.parking ? "Available" : "Not Available"}
            </p>
            <p className="text-gray-700">
              Breakfast: {venue.meta.breakfast ? "Available" : "Not Available"}
            </p>
            <p className="text-gray-700">
              Pets: {venue.meta.pets ? "Allowed" : "Not Allowed"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
