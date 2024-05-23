import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function CreateVenuePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [],
    price: "",
    maxGuests: "",
    rating: "",
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
      lat: "",
      lng: "",
    },
  });
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

  const createVenue = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");

    const locationData = {
      ...formData.location,
      ...(formData.location.lat && { lat: parseFloat(formData.location.lat) }),
      ...(formData.location.lng && { lng: parseFloat(formData.location.lng) }),
    };

    const submissionData = {
      ...formData,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests),
      rating: parseFloat(formData.rating),
      location: locationData,
    };

    console.log("Submitting formData:", submissionData);

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/holidaze/venues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log("Created Venue:", responseData);
        setSuccessMessage("Venue created successfully!"); // Set success message
        navigate("/myvenues");
      } else {
        console.log(responseData);
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const previewImage = (event) => {
    const imageUrl = event.target.value;
    setImagePreviewUrls([imageUrl]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      media: [imageUrl],
    }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="max-w-3xl mx-auto p-1 relative rounded-md mt-5 bg-stone-50">
      <div className="p-8 bg-stone-50 rounded-md drop-shadow-xl">
        <h1 className="flex justify-center text-4xl font-semibold text-gray-800 mb-4">
          Create a Venue
        </h1>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}
        <div className="mb-6">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${(step / 3) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step 1</span>
              <span>Step 2</span>
              <span>Step 3</span>
            </div>
          </div>
        </div>
        <form onSubmit={createVenue} className="grid gap-6">
          {step === 1 && (
            <>
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
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                  onChange={previewImage}
                />
                {imagePreviewUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt="Image Preview"
                    className="mt-2 rounded-md"
                  />
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-semibold"
                >
                  Price (NOK):
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                  value={formData.price}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.select()}
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
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.select()}
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
                  className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                  value={formData.rating}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.select()}
                />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Amenities:
                </p>
                <div className="flex flex-wrap">
                  <label className="inline-flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-500 form-checkbox"
                      name="wifi"
                      checked={formData.meta.wifi}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Wi-Fi</span>
                  </label>
                  <label className="inline-flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-500 form-checkbox"
                      name="parking"
                      checked={formData.meta.parking}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Parking</span>
                  </label>
                  <label className="inline-flex items-center mr-4 mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-500 form-checkbox"
                      name="breakfast"
                      checked={formData.meta.breakfast}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Breakfast</span>
                  </label>
                  <label className="inline-flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-500 form-checkbox"
                      name="pets"
                      checked={formData.meta.pets}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Pets</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                    value={formData.location.continent}
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                    value={formData.location.lng}
                    onChange={handleInputChange}
                    required
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
                    className="w-full p-2 mt-2 border rounded-md border-gray-300 focus:outline-none focus:border-green-500"
                    value={formData.location.lat}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
                  onClick={prevStep}
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                  Create Venue
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
