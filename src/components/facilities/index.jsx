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

export default function facilities() {
  return (
    <div className="flex flex-row gap-x-12 overflow-x-auto ml-3">
      <div className="flex flex-col items-center">
        <TbBeach className="text-xl" />
        <p className="font-xs">Beach</p>
      </div>
      <div className="flex flex-col items-center">
        <GiWoodCabin className="text-xl" />
        <p className="font-xs">Cabins</p>
      </div>
      <div className="flex flex-col items-center">
        <PiParkBold className="text-xl" />
        <p className="font-xs">National Parks</p>
      </div>
      <div className="flex flex-col items-center">
        <FaHotel className="text-xl" />
        <p className="font-xs">Hotels</p>
      </div>
      <div className="flex flex-col items-center">
        <LiaSwimmingPoolSolid className="text-xl" />
        <p className="font-xs">Amazing pools</p>
      </div>
      <div className="flex flex-col items-center">
        <GiCastle className="text-xl" />
        <p className="font-xs">Mansions</p>
      </div>
      <div className="flex flex-col items-center">
        <GiPalmTree className="text-xl" />
        <p className="font-xs">Tropical</p>
      </div>
      <div className="flex flex-col items-center">
        <GiSpeedBoat className="text-xl" />
        <p className="font-xs">Boats</p>
      </div>
      <div className="flex flex-col items-center">
        <GiSkis className="text-xl" />
        <p className="font-xs">Skisport</p>
      </div>
      <div className="flex flex-col items-center">
        <GiCampingTent className="text-xl" />
        <p className="font-xs">Camping</p>
      </div>
      <div className="flex flex-col items-center">
        <GiPisaTower className="text-xl" />
        <p className="font-xs">Famous Citys</p>
      </div>
      <div className="flex flex-col items-center">
        <IoGolfSharp className="text-xl" />
        <p className="font-xs">Golfing</p>
      </div>
      <div className="flex flex-col items-center">
        <MdEmojiFoodBeverage className="text-xl" />
        <p className="font-xs items-center">Bed & Breakfast</p>
      </div>
    </div>
  );
}
