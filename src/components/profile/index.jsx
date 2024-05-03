import { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userName = localStorage.getItem("name");
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user profile. Status: ${response.status}`
          );
        }

        const responseData = await response.json();
        console.log("Response data:", responseData);

        setProfileData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const input = e.target.value;
    setIsAvatarUpdated(false);

    if (input.startsWith("http") || input.startsWith("https")) {
      setNewAvatar(input);
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewAvatar(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newAvatar) {
      setAvatar(newAvatar);
      setIsAvatarUpdated(true);
    }
    setNewAvatar(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col bg-white border max-w-md border-white backdrop-hue-rotate-90  m-20 drop-shadow-2xl  dark:bg-orange-300 dark:border-orange-500 md:w-1/2">
        <div className=" w-full h-54">
          {avatar ? (
            <img src={avatar} alt="Avatar" className=" w-full mb-2  md:mr-4" />
          ) : (
            <div className="flex justify-center m-20">
              <FaImage className="flex justify-center" />
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="mb-3">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Username:
            </p>
            <p>{profileData?.name}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Email: {profileData?.email}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Bio: {profileData?.bio}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Number of Venues: {profileData?._count?.venues}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Number of Bookings: {profileData?._count?.bookings}
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="w-16 h-16 mb-2 rounded-full md:mr-4"
              />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="text-sm font-bold text-black">
                Upload New Avatar (URL or File):
              </label>
              <div className="flex flex-col items-center md:flex-row">
                <input
                  className="w-full px-2 py-1 mb-2 border border-black md:mb-0 md:mr-2"
                  type="text"
                  placeholder="Enter URL or choose a file"
                  value={newAvatar || ""}
                  onChange={handleAvatarChange}
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-thin text-white border border-black rounded-md md:w-auto bg-black hover:bg-red-400"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {isAvatarUpdated && (
            <div className="mt-2 text-green-500">
              Avatar updated successfully! &#x2713;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
