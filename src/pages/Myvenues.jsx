import { useEffect, useState } from "react";
import Profile from "../components/profile";

const MyVenuesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    document.body.style.backgroundImage = `url("https://wallpapers.com/images/hd/black-and-white-palm-tree-yzzqr0px3rfh9zwm.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      const name = localStorage.getItem("name");
      const accessToken = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/venues?sort=created&sortOrder=desc`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();

        console.log("Fetched venues:", data);

        if (Array.isArray(data)) {
          setVenues(data);
        } else {
          console.warn("API response is not an array:", data);
          setVenues([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("fetchVenues, error:", error);
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleDeleteVenue = async (venueId) => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        setVenues((prevVenues) =>
          prevVenues.filter((venue) => venue.id !== venueId)
        );
      } else {
        console.error("Failed to delete venue:", res.statusText);
      }
    } catch (error) {
      console.error("handleDeleteVenue, error:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1 className="flex justify-center text-black p-10 text-3xl">
          YOUR PROFILE
        </h1>
        <Profile />
      </div>
      <h1 className="flex justify-center mt- py-2 text-3xl ">
        YOUR VENUES AND BOOKINGS
      </h1>
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mb-10 m-5 ">
        {venues && venues.length > 0
          ? venues.map((venue) => (
              <div
                key={venue.id}
                className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl"
              >
                <div className="relative" style={{ paddingBottom: "100%" }}>
                  <img
                    src={venue.media[0]}
                    alt={venue.name}
                    className="absolute object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col items-center px-6 py-4 text-black drop-shadow-2xl">
                  <h2 className="mb-2 text-xl font-bold">{venue.name}</h2>
                  <p className="text-base text-gray-700">
                    Description:{venue.description}
                  </p>
                  <p className="text-base text-gray-700">Price:{venue.price}</p>
                  <p className="text-base text-gray-700">
                    Guests: {venue.maxGuests}
                  </p>
                  <p className="text-base text-gray-700">
                    Rating: {venue.rating}
                  </p>
                  <p className="text-base text-gray-700">
                    Facilities: {venue.meta.wifi}
                  </p>
                  <p className="text-base text-gray-700">
                    {venue.meta.parking}
                  </p>
                  <p className="text-base text-gray-700">{venue.meta.pets}</p>

                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="px-4 py-2 font-thin text-black rounded bg-inherit hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default MyVenuesPage;
