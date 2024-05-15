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
    document.body.style.backgroundImage = `url("https://wallpapers.com/images/hd/black-and-white-palm-tree-yzzqr0px3rfh9zwm.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

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
        console.error("Login To Your Profile", error);
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
    <section className="flex items-center justify-center min-h-screen drop-shadow-xl">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-32 h-32 mb-3 rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full">
              <FaImage className="text-gray-400" size={64} />
            </div>
          )}
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">{profileData?.name}</h2>
          <p className="text-gray-500">{profileData?.email}</p>
          <p className="text-gray-500">{profileData?.bio}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Upload New Avatar (URL or File)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                className="block w-full mt-1 form-input rounded-l-md"
                placeholder="Enter URL or choose a file"
                value={newAvatar || ""}
                onChange={handleAvatarChange}
              />
              <button
                type="submit"
                className="px-4 py-2 ml-1 text-black bg-pink-100 rounded-full"
              >
                Update
              </button>
            </div>
          </div>
          {isAvatarUpdated && (
            <div className="text-green-500">Avatar updated successfully!</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
