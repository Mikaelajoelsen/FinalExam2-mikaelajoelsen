import { useEffect } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1552917690-2f32ed7c0823?q=80&w=3069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  const navigateToLogin = () => {
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password, name, avatar } = event.target.elements;
    console.log(email, password, name, avatar);
    const payload = {
      name: name.value,
      email: email.value,
      avatar: avatar?.value,
      password: password.value,
    };

    console.log(payload);

    try {
      const res = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resJSON = await res.json();

      if (resJSON.statusCode > 300) {
        setErrorMessage(resJSON.errors[0].message);
      } else {
        localStorage.setItem("email", email.value);
        setIsSuccess(res.ok);
        navigateToLogin();
      }
    } catch (error) {
      console.warn("An error occurred", error);

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>An error occurred: {error?.message}</div>;

  return (
    <>
      <div className="flex-1 min-h-screen p-6 mt-6 mb-6 bg-white sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-full max-w-sm mx-auto">
          <h2 className="mt-6 text-4xl font-thin leading-7 text-center text-gray-700">
            Register
          </h2>
        </div>

        <div className="mt-6">
          {isSuccess ? (
            <section>
              <p className="text-center text-green-900">
                👋 Hi {localStorage.getItem("email")}. You will now redirect to
                the login page!
              </p>
            </section>
          ) : (
            <form
              className="space-y-6"
              action="/profile"
              method="#"
              onSubmit={handleOnSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  defaultValue={`RandomUser_${Math.floor(
                    Math.random() * 10000000
                  )}`}
                  className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-gray-400 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-zinc-600"
                  placeholder="Username"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={`${Math.floor(
                    Math.random() * 10000000
                  )}@stud.noroff.no`}
                  className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-gray-400 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-zinc-600"
                  placeholder="Email"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  ></label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-gray-400 border  shadow-sm focus:outline-none focus:ring focus:border-gray-600"
                  placeholder="Password"
                />
              </div>
              {errorMessage && <div>{errorMessage}</div>}
              <div className="content-center">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-900"
                >
                  Avatar
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="url"
                  autoComplete="avatar"
                  className="flex content-center w-full h-12 px-4 mt-1 text-black placeholder-gray-900 border rounded-full shadow-sm focus:outline-none focus:ring focus:border-indigo-600"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full h-12 px-4 text-lg font-thin text-white rounded-full shadow-sm bg-zinc-500 hover:bg-gray-500 focus:outline-none focus:ring focus:border-zinc-600"
                >
                  Register
                </button>
              </div>

              <div className="mt-2 text-center">
                <a
                  href="#"
                  className="text-sm font-semibold text-zinc-400 hover:text-zinc-500"
                >
                  Already a member?
                </a>
              </div>

              <div className="mt-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full h-12 px-4 text-lg font-thin text-black border border-black rounded-full shadow-sm hover:bg-zinc-200 focus:outline-none focus:ring focus:border-zinc-600"
                >
                  {isLoading ? "Registering" : "Login"}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
