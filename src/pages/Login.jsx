import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaSnapchatGhost,
} from "react-icons/fa";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1530177150700-84cd9a3b059b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "";

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, []);

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/" });
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();

      if (data.statusCode > 300) {
        throw new Error(data.status + ". Please try again");
      }

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user_email", data.email);
      localStorage.setItem("name", data.name);
      setData(data);
      setIsSuccess(res.ok);
      navigateToHome();
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
      <div className="flex flex-col bg-white justify-center px-4 py-6 mt-6 mb-8 drop-shadow-xl sm:mx-auto sm:w-full sm:max-w-md rounded-lg opacity-90">
        <h1 className="mt-6 text-xl font-bold leading-9 text-center text-black sm:mt-8 sm:text-3xl ">
          Sign in here
        </h1>
        {isSuccess ? (
          <section>
            <p className="text-center text-red-900">
              👋 Hi {data?.name}. You are now registered as a venue manager!
            </p>
          </section>
        ) : (
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleOnSubmit}
          >
            <div className="mb-4">
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
                className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-white border rounded-full shadow-sm focus:outline-none focus:ring focus:border-zinc-600 sm:text-lg"
                placeholder="email/username"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                ></label>
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-600 hover:text-gray-500"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full h-12 px-4 mt-1 text-gray-900 placeholder-white border  shadow-sm focus:outline-none focus:ring focus:border-gray-600 sm:text-lg rounded-full"
                placeholder="password"
              />
            </div>

            <div className="mb-6">
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center justify-center w-full h-12 px-4 text-lg font-thin text-white rounded-full shadow-sm bg-stone-600 hover:bg-stone-400 focus:outline-none focus:ring focus:border-zinc-600"
              >
                {isLoading ? "Signing in" : "Sign in"}
              </button>
            </div>

            <div className="mb-2 text-center">
              <a
                href="#"
                className="text-sm font-semibold text-zinc-400 hover:text-zinc-500"
              >
                Register here
              </a>
            </div>
            <div className="flex justify-center w-full mt-4 w-86">
              <Link
                to="/register"
                className="flex justify-center w-full px-3 py-4 text-lg font-thin leading-6 text-center text-black border border-black rounded-full shadow-sm hover:bg-stone-50 w-86 hover:from-stone-100 hover:to-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-200"
              >
                Register
              </Link>
            </div>
          </form>
        )}
        <div className="flex justify-center mt-6 space-x-4 ">
          <FaFacebook className="text-blue-800 hover:text-xl" />
          <FaInstagramSquare className="text-pink-600 hover:text-xl" />
          <FaTwitter className="text-blue-500 hover:text-xl" />
          <FaSnapchatGhost className="text-amber-200 hover:text-xl" />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
