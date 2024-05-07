import { TbBeach } from "react-icons/tb";
import { PiParkBold } from "react-icons/pi";
import { GiWoodCabin } from "react-icons/gi";
import { FaHotel } from "react-icons/fa6";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GiCastle } from "react-icons/gi";
import { GiPalmTree } from "react-icons/gi";
import { GiSpeedBoat } from "react-icons/gi";
import { GiSkis } from "react-icons/gi";
import { GiCampingTent } from "react-icons/gi";
import { GiPisaTower } from "react-icons/gi";
import { IoGolfSharp } from "react-icons/io5";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { GiGrapes } from "react-icons/gi";
import { GiCaveEntrance } from "react-icons/gi";
import { GiWindmill } from "react-icons/gi";
import { GrWheelchairActive } from "react-icons/gr";

export default function facilities() {
  return (
    <div className="flex flex-row gap-x-12 overflow-x-auto ml-3">
      <div className="flex flex-col items-center text-black">
        <TbBeach className="text-xl" />
        <p className="font-xs">Beach</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiWoodCabin className="text-xl " />
        <p className="font-xs">Cabins</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <PiParkBold className="text-xl" />
        <p className="font-xs">National Parks</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <FaHotel className="text-xl" />
        <p className="font-xs">Hotels</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <LiaSwimmingPoolSolid className="text-xl" />
        <p className="font-xs">Amazing pools</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiCastle className="text-xl" />
        <p className="font-xs">Mansions</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiPalmTree className="text-xl" />
        <p className="font-xs">Tropical</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiSpeedBoat className="text-xl" />
        <p className="font-xs">Boats</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiSkis className="text-xl" />
        <p className="font-xs">Skisport</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiCampingTent className="text-xl" />
        <p className="font-xs">Camping</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiPisaTower className="text-xl" />
        <p className="font-xs">Famous Citys</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <IoGolfSharp className="text-xl" />
        <p className="font-xs">Golfing</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <MdEmojiFoodBeverage className="text-xl" />
        <p className="font-xs items-center">Bed & Breakfast</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiGrapes className="text-xl" />
        <p className="font-xs items-center">Wine Yard</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiCaveEntrance className="text-xl" />
        <p className="font-xs items-center">Cave</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GiWindmill className="text-xl" />
        <p className="font-xs items-center">Windmills</p>
      </div>
      <div className="flex flex-col items-center text-black">
        <GrWheelchairActive className="text-xl" />
        <p className="font-xs items-center">WheelChair Friendly</p>
      </div>
    </div>
  );
}
