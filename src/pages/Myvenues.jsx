import { useEffect, useState } from "react";
import Profile from "../components/profile";
import Booking from "../components/bookings";

const MyVenuesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "#FEFEFE";
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

        setVenues(data);
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
        `https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_bookings=true`,
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

  const handleEditVenue = (venue) => {
    setEditFormData(venue);
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      const fieldName = name.split(".");
      const field = fieldName[1];
      const meta = { ...editFormData.meta, [field]: checked };
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        meta: meta,
      }));
    } else if (name.startsWith("location.")) {
      const field = name.replace("location.", "");
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [field]: type === "number" ? parseFloat(value) || 0 : value,
        },
      }));
    } else {
      setEditFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };
  const handleUpdateVenue = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("access_token");

    try {
      const res = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues/${editFormData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (res.ok) {
        const updatedVenue = await res.json();
        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue.id === updatedVenue.id ? updatedVenue : venue
          )
        );
        setIsEditing(false);
        setEditFormData(null);
      } else {
        console.error("Failed to update venue:", res.statusText);
      }
    } catch (error) {
      console.error("handleUpdateVenue, error:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Profile />
      </div>
      <h3 className="flex justify-center py-2 text-3xl font-thin">BOOKINGS</h3>
      <Booking />
      <h3 className="flex justify-center py-2 text-3xl font-thin">VENUES</h3>
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mb-10 m-5">
        {venues && venues.length > 0 ? (
          venues.map((venue) => (
            <div
              key={venue.id}
              className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl"
            >
              <div className="relative" style={{ paddingBottom: "100%" }}>
                {venue.media && venue.media.length > 0 && (
                  <img
                    src={venue.media[0]}
                    alt={venue.name}
                    className="absolute object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex flex-col items-center px-6 py-4 text-black drop-shadow-2xl">
                <h2 className="mb-2 text-xl font-bold">{venue.name}</h2>
                <p className="text-base text-gray-700">
                  Description: {venue.description}
                </p>
                <p className="text-base text-gray-700">Price: {venue.price}</p>
                <p className="text-base text-gray-700">
                  Guests: {venue.maxGuests}
                </p>
                <p className="text-base text-gray-700">
                  Rating: {venue.rating}
                </p>
                <p className="text-base text-gray-700">
                  Facilities: {venue.meta.wifi}
                </p>
                <p className="text-base text-gray-700">{venue.meta.parking}</p>
                <p className="text-base text-gray-700">{venue.meta.pets}</p>

                <button
                  onClick={() => handleEditVenue(venue)}
                  className="px-4 py-2 font-thin text-black rounded bg-inherit hover:border border-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteVenue(venue.id)}
                  className="px-4 py-2 font-thin text-black rounded bg-inherit hover:border border-red-500 mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No venues yet</div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-thin mb-4">Edit Venue</h2>
            <form onSubmit={handleUpdateVenue}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-semibold"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.price || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="maxGuests"
                  className="block text-gray-700 font-semibold"
                >
                  Maximum Guests:
                </label>
                <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.maxGuests || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block text-gray-700 font-semibold"
                >
                  Rating:
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.rating || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">
                  Facilities:
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="wifi"
                      name="meta.wifi"
                      className="mr-2"
                      checked={editFormData.meta.wifi || false}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="wifi">Wi-Fi</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="parking"
                      name="meta.parking"
                      className="mr-2"
                      checked={editFormData.meta.parking || false}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="parking">Parking</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="breakfast"
                      name="meta.breakfast"
                      className="mr-2"
                      checked={editFormData.meta.breakfast || false}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="breakfast">Breakfast</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pets"
                      name="meta.pets"
                      className="mr-2"
                      checked={editFormData.meta.pets || false}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="pets">Pets Allowed</label>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-300 text-black rounded hover:bg-green-600"
                >
                  Update Venue
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 ml-2 bg-stone-300 text-black rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVenuesPage;
