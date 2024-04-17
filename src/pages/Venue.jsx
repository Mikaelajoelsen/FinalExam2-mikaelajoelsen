import { useEffect, useState } from "react";

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

const VenuePage = () => {
  const [venue, setVenue] = useState(initialVenueState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const pathSegments = window.location.pathname.split("/");
        const venueId = pathSegments[pathSegments.length - 1];
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col w-3/4 mx-auto mt-12 mb-6">
        <div>
          {venue && (
            <>
              <h1 className="flex justify-center mb-2 text-2xl font-bold text-black">
                {venue.name}
              </h1>

              <img
                className="object-cover w-full rounded-2xl h-72"
                src={venue?.media?.[0]}
                alt=""
              />
              <p className="flex justify-center mb-2 text-black">
                Created: {venue.created}
              </p>
              <p className="flex justify-center mb-2 text-black">
                Updated {venue.updated}
              </p>
              <p className="flex justify-center mb-2 text-black">
                Info: {venue.description}
              </p>
              <p className="flex justify-center mb-2 text-black">
                Rating: {venue.rating}
              </p>
              <p className="flex justify-center mb-2 text-gray-500">
                Price: ${venue.price} per night
              </p>
              <p className="flex justify-center mb-2 text-gray-500">
                Max Guests: {venue.maxGuests}
              </p>
              {venue.location && (
                <p className="flex justify-center mb-2 text-gray-500">
                  Address: {venue.location.address}, {venue.location.city},{" "}
                  {venue.location.country}
                </p>
              )}
              {venue.meta && (
                <p className="flex justify-center mb-2 text-gray-500">
                  Facilities:
                  {venue.meta.id ? ` ${venue.meta.id},` : ""}
                  {venue.meta.breakfast ? " Breakfast," : ""}
                  {venue.meta.parking ? " Parking," : ""}
                  {venue.meta.pets ? " Pets," : ""}
                  {venue.meta.wifi ? " Wifi" : ""}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VenuePage;
