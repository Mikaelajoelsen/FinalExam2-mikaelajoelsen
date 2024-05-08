import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: ["https:///..."],
    price: 0,
    maxGuests: 0,
    rating: 0,
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
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const createVenue = async (event) => {
    event.preventDefault();

    formData["maxPrice"] = parseInt(formData["maxPrice"]);

    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Created Venue:", responseData);
        navigate("/myvenues");
      } else {
        console.error(
          "Error:",
          responseData.message || "An unknown error occurred."
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        meta: {
          ...prevFormData.meta,
          [name]: checked,
        },
      }));
    } else if (name.startsWith("location.")) {
      const field = name.replace("location.", "");
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [field]: value,
        },
      }));
    } else {
      const parsedValue = type === "number" ? parseFloat(value) : value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue,
      }));
    }
  };

  const previewImage = (event) => {
    const imageUrl = event.target.value;
    setImagePreviewUrl(imageUrl);
    setFormData({
      ...formData,
      media: [imageUrl],
    });
  };

  return (
    <div className=" max-w-6xl mx-auto p-1 relative rounded-md mt-5">
      <div className="p-8 bg-white rounded-md">
        <h1 className="text-5xl font-thin text-start mb-4">Create a Venue</h1>
        <form onSubmit={createVenue} className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
              value={formData.name}
              onChange={handleInputChange}
              required
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
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="media"
              className="block text-gray-700 font-semibold"
            >
              Media URL:
            </label>
            <input
              type="text"
              id="media"
              name="media"
              className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
              onChange={previewImage}
            />
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="mt-2 rounded-md"
              />
            )}
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
              value={formData.price}
              onChange={handleInputChange}
              required
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
              value={formData.maxGuests}
              onChange={handleInputChange}
              required
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
              value={formData.rating}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-700 mb-2">Amenities:</p>
            <div className="flex flex-wrap">
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-50 form-checkbox"
                  name="wifi"
                  checked={formData.meta.wifi}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Wi-Fi</span>
              </label>
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-200 form-checkbox"
                  name="parking"
                  checked={formData.meta.parking}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Parking</span>
              </label>
              <label className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-50 form-checkbox"
                  name="breakfast"
                  checked={formData.meta.breakfast}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Breakfast</span>
              </label>
              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-100 form-checkbox"
                  name="pets"
                  checked={formData.meta.pets}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Pets</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="location.address"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold"
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="location.city"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block text-gray-700 font-semibold"
              >
                Zip:
              </label>
              <input
                type="text"
                id="zip"
                name="location.zip"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.zip}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-semibold"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="location.country"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.country}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="continent"
                className="block text-gray-700 font-semibold"
              >
                Continent:
              </label>
              <input
                type="text"
                id="continent"
                name="location.continent"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.continent}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="latitude"
                className="block text-gray-700 font-semibold"
              >
                Latitude:
              </label>
              <input
                type="number"
                id="latitude"
                name="location.lat"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-pink-500"
                value={formData.location.lat ? "" : formData.location.lat}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="block text-gray-700 font-semibold"
              >
                Longitude:
              </label>
              <input
                type="number"
                id="longitude"
                name="location.lng"
                className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-black"
                value={formData.location.lng}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-50 font-thin text-black rounded-full hover:bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 hover:text-xl focus:outline-none focus:ring focus:border-pink-300"
            >
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
