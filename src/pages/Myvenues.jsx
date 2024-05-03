import { useEffect, useState } from "react";
import Profile from "../components/profile";

const MyVenuesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venues, setVenues] = useState([]);

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

        console.log("Fetched venues:", data); // Log fetched data

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
        `https://api.noroff.dev/api/v1/holidaze/venue/${venueId}`,
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
      <h1 className="flex justify-center text-4xl font-thin text-black">
        Your Venues
      </h1>
      <Profile />
      <div>
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {venues && venues.length > 0 ? (
            venues.map((venue) => (
              <div
                key={venue.id}
                className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl"
              >
                <div className="relative" style={{ paddingBottom: "100%" }}>
                  <img
                    src={venue.media[0]?.url}
                    alt={venue.name}
                    className="absolute object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col items-center px-6 py-4 text-black">
                  <h2 className="mb-2 text-xl font-bold">{venue.name}</h2>
                  <p className="text-base text-gray-700">{venue.description}</p>
                  <button
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="px-4 py-2 font-thin text-black rounded bg-inherit hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No venues found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVenuesPage;
