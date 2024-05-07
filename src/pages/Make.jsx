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

  console.log(formData);

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
    <div className="max-w-4xl p-8 mx-auto mt-5 mb-5 bg-white opacity-90 inset-0 rounded-md border-gradient-to-br from-pink-50 via-red-50 to-pink-50 drop-shadow-xl ">
      <h1 className="flex justify-center mb-6 text-4xl font-thin">
        Create a Venue
      </h1>
      <form onSubmit={createVenue}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700 "
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-xl font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="media"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Media URL:
          </label>
          <div className="mb-4">
            <input
              type="text"
              id="media"
              name="media"
              className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
              onChange={previewImage}
            />
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="rounded-md max-h-32 mt-2"
              />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxGuests"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Maximum Guests:
          </label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.maxGuests}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className=" mb-4">
          <label
            htmlFor="rating"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
        <p className="block text-xl font-medium text-gray-700">Amenities:</p>

        <div className="flex flex-wrap justify-between mb-8 ">
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="w-5 h-5 text-pink-600 form-checkbox"
              name="wifi"
              checked={formData.meta.wifi}
              onChange={handleInputChange}
            />
            <span className="ml-2">Wi-Fi</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="w-5 h-5 text-pink-600 form-checkbox"
              name="parking"
              checked={formData.meta.parking}
              onChange={handleInputChange}
            />
            <span className="ml-2">Parking</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="w-5 h-5 text-pink-600 form-checkbox"
              name="breakfast"
              checked={formData.meta.breakfast}
              onChange={handleInputChange}
            />
            <span className="ml-2">Breakfast</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="checkbox"
              className="w-5 h-5 text-pink-600 form-checkbox"
              name="pets"
              checked={formData.meta.pets}
              onChange={handleInputChange}
            />
            <span className="ml-2">Pets</span>
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="text-xl font-medium text-gray-700 bg-inherit"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="location.address"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            name="location.city"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Zip:
          </label>
          <input
            type="text"
            id="zip"
            name="location.zip"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.zip}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="location.country"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="continent"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Continent:
          </label>
          <input
            type="text"
            id="continent"
            name="location.continent"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.continent}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="latitude"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Latitude:
          </label>
          <input
            type="number"
            id="latitude"
            name="location.lat"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.lat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-xl font-medium text-gray-700 bg-inherit"
          >
            Longitude:
          </label>
          <input
            type="number"
            id="longitude"
            name="location.lng"
            className="w-full p-2 mt-1 border-b-2 border-white bg-inherit drop-shadow-lg"
            value={formData.location.lng}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 font-thin text-black drop-shadow-md  bg-white hover:opacity-90 inset-0 hover:bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 focus:outline-none focus:ring focus:border-gray-300 rounded-full"
          >
            Create Venue
          </button>
        </div>
      </form>
    </div>
  );
}
