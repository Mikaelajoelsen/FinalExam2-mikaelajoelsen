import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "string",
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 0,
    created: "string",
    updated: "string",
    venue: {
      id: "string",
      name: "string",
      description: "string",
      media: ["string"],
      price: 0,
      maxGuests: 0,
      created: "string",
      updated: "string",
      meta: {
        wifi: true,
        parking: true,
        breakfast: true,
        pets: true,
      },
      location: {
        address: "string",
        city: "string",
        zip: "string",
        country: "string",
        continent: "string",
        lat: 0,
        lng: 0,
      },
    },
    customer: {
      name: "string",
      email: "user@example.com",
      avatar: "https://url.com/image.jpg",
    },
  });

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      const name = localStorage.getItem("name");
      const accessToken = localStorage.getItem("access_token");
      try {
        const res = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings?_customer=true&_venue=true&sort=created&sortOrder=desc`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        console.log("fetching bookings", data);

        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        console.error("fetchBookings, error:", error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error(`Error deleting booking: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    await deleteBooking(bookingId);
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );
    setBookings(updatedBookings);
  };

  const handleEditBooking = (booking) => {
    setEditFormData({
      id: booking.id,
      dateFrom: new Date(booking.dateFrom),
      dateTo: new Date(booking.dateTo),
      guests: booking.guests,
      created: booking.created,
      updated: booking.updated,
      venue: booking.venue,
      customer: booking.customer,
    });
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleUpdateBooking = async (event) => {
    event.preventDefault();
    const updatedBookings = bookings.map((booking) =>
      booking.id === editFormData.id ? editFormData : booking
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setIsEditing(false);
    setEditFormData({
      id: "",
      dateFrom: new Date(),
      dateTo: new Date(),
      guests: 0,
      created: "",
      updated: "",
      venue: {
        id: "",
        name: "",
        description: "",
        media: [""],
        price: 0,
        maxGuests: 0,
        created: "",
        updated: "",
        meta: {
          wifi: true,
          parking: true,
          breakfast: true,
          pets: true,
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
      },
      customer: {
        name: "",
        email: "",
        avatar: "",
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 mb-10 m-5">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="w-full max-w-xs overflow-hidden bg-white shadow-lg rounded-t-xl"
            >
              <div className="relative" style={{ paddingBottom: "100%" }}>
                {booking?.venue?.media && booking?.venue?.media.length > 0 ? (
                  <img
                    src={booking.venue.media[0]}
                    alt={booking.venue.name}
                    className="absolute object-cover w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute flex items-center justify-center w-full h-full bg-gray-200">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center px-6 py-4 text-black drop-shadow-2xl">
                <h2 className="mb-2 text-xl font-bold">{booking.venue.name}</h2>
                <p className="text-base text-gray-700">
                  Date From: {new Date(booking.dateFrom).toLocaleDateString()}
                </p>
                <p className="text-base text-gray-700">
                  Date To: {new Date(booking.dateTo).toLocaleDateString()}
                </p>
                <p className="text-base text-gray-700">
                  Guests: {booking.guests}
                </p>
                <button
                  onClick={() => handleEditBooking(booking)}
                  className="px-4 py-2 font-thin text-black rounded bg-inherit hover:border border-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="px-4 py-2 font-thin text-black rounded bg-inherit hover:border border-red-500 mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No Bookings yet</div>
        )}
      </div>

      {isEditing && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-thin mb-4">Edit Booking</h2>
            <form onSubmit={handleUpdateBooking}>
              <div>
                <label
                  htmlFor="dateFrom"
                  className="block text-gray-700 font-semibold"
                >
                  Date From:
                </label>
                <DatePicker
                  id="dateFrom"
                  selected={editFormData.dateFrom}
                  onChange={(date) => handleDateChange("dateFrom", date)}
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label
                  htmlFor="dateTo"
                  className="block text-gray-700 font-semibold"
                >
                  Date To:
                </label>
                <DatePicker
                  id="dateTo"
                  selected={editFormData.dateTo}
                  onChange={(date) => handleDateChange("dateTo", date)}
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="block text-gray-700 font-semibold"
                >
                  Guests:
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.guests}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="created"
                  className="block text-gray-700 font-semibold"
                >
                  Created:
                </label>
                <input
                  type="text"
                  id="created"
                  name="created"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.created}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="updated"
                  className="block text-gray-700 font-semibold"
                >
                  Updated:
                </label>
                <input
                  type="text"
                  id="updated"
                  name="updated"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                  value={editFormData.updated}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 font-thin text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 font-thin text-white bg-red-500 rounded hover:bg-red-600 ml-2"
                  onClick={() => {
                    setIsEditing(false);
                    setEditFormData({
                      id: "",
                      dateFrom: new Date(),
                      dateTo: new Date(),
                      guests: 0,
                      created: "",
                      updated: "",
                      venue: {
                        id: "",
                        name: "",
                        description: "",
                        media: [""],
                        price: 0,
                        maxGuests: 0,
                        created: "",
                        updated: "",
                        meta: {
                          wifi: true,
                          parking: true,
                          breakfast: true,
                          pets: true,
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
                      },
                      customer: {
                        name: "",
                        email: "",
                        avatar: "",
                      },
                    });
                  }}
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

export default BookingsPage;
