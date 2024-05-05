import Venues from "./Venues";
import Mostvisited from "../components/Mostvisited";
import "@fontsource/la-belle-aurore";
import Facilities from "../components/facilities";
import Tips from "../components/tips";
import Newsletter from "../components/newsletter";

export default function Homepage() {
  return (
    <>
      <div className="h-mvh">
        <div className="relative sm:flex-shrink">
          <img
            className="w-full h-svh "
            src="https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Homepage background"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center p-4 bg-white bg-opacity-50">
            <h1 className="mt-24 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-la-belle-aurore mb-4 text-center">
              Find Your Dream Location
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-thin mb-8 text-center">
              Find The Perfect Place To Stay On Your Holiday
            </p>
            <div className="flex flex-wrap md:flex-row justify-center md:space-x-8">
              <button
                to="/venues"
                className="  font-thin rounded-full text-black bg-pink-100  px-4 py-2 shadow-lg hover:bg-pink-50 mb-4 md:mb-0 w-full md:w-auto shadow-black"
              >
                View Our Locations
              </button>
              <button
                to="/myvenues"
                className="font-thin text-black rounded-full bg-pink-100 px-4 py-2 shadow-md hover:bg-pink-50 w-full md:w-auto shadow-black"
              >
                Go to your bookings
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Mostvisited />
      </div>
      <div className="mt-6">
        <Facilities />
      </div>
      <div className="mt-2">
        <Venues />
      </div>
      <div>
        <Tips />
      </div>
      <div>
        <Newsletter />
      </div>
    </>
  );
}
