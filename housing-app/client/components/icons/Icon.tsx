import { AiOutlineCar, AiOutlineWifi, AiOutlineHome, AiOutlineMenu, AiFillPhone } from 'react-icons/ai';
import { MdOutlineLocalLaundryService, MdBalcony, MdOutlineYard, MdComputer, MdOutlineKitchen, MdElevator } from 'react-icons/md';
import { TbGrill, TbToolsKitchen2 } from 'react-icons/tb';
import { PiElevator, PiTelevision, PiUsersThreeLight } from 'react-icons/pi';
import { GiDesk } from 'react-icons/gi';
import { TbSmokingNo } from 'react-icons/tb';
import { GrMoney } from 'react-icons/gr'
import { BiMap, BiSolidWasher, BiSolidParking, BiPlusMedical, BiAnchor } from 'react-icons/bi'
import { IoBedOutline, IoTodayOutline } from 'react-icons/io5'
import { LuBox } from 'react-icons/lu'
import { BsBuildings, BsDoorOpen, BsInstagram, BsLinkedin, BsDropbox, BsFillTreeFill } from 'react-icons/bs'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { ImFacebook2 } from 'react-icons/im'
import { FaUserCircle, FaChargingStation, FaBowlingBall, FaRecycle, FaBath, FaGasPump, FaBus, FaShower } from 'react-icons/fa'

type IconitemProps = {
  include: string | null,
  showText: boolean | null
  className?: string;
}

const Icon = ({ include, showText = false }: IconitemProps) => {
  let icon = null;
  let text = include;

switch (include) {
  case 'charging': 
    icon = <FaChargingStation/>
    include = 'charging'
    break;
  case 'storage': 
    icon = <BsDropbox/>
    include = 'storage'
    break;
  case 'computer': 
    icon = <MdComputer/>
    include = 'computer'
    break;
  case 'nature': 
    icon = <BsFillTreeFill/>
    include = 'nature'
    break;
  case 'bowling': 
    icon = <FaBowlingBall/>
    include = 'bowling'
    break;
  case 'parking': 
    icon = <BiSolidParking/>
    include = 'parking'
    break;
  case 'recycle': 
    icon = <FaRecycle/>
    include = 'recycle'
    break;
  case 'bathtube': 
    icon = <FaBath/>
    include = 'bathtube'
    break;
  case 'gas': 
    icon = <FaGasPump/>
    include = 'gas'
    break;
  case 'kitchen': 
    icon = <MdOutlineKitchen/>
    include = 'kitchen'
    break;
  case 'bus': 
    icon = <FaBus/>
    include = 'bus'
    break;
  case 'medicalkit': 
    icon = <BiPlusMedical/>
    include = 'medicalkit'
    break;
  case 'harbor': 
    icon = <BiAnchor/>
    include = 'harbor'
    break;
  case 'elevator': 
    icon = <MdElevator/>
    include = 'elevator'
    break;
  case 'landphone': 
    icon = <AiFillPhone/>
    include = 'landphone'
    break;
  case 'shower': 
    icon = <FaShower/>
    include = 'shower'
    break;
  case 'nonsmoking': 
    icon = <TbSmokingNo/>
    include = 'nonsmoking'
    break;
  case 'House': 
    icon = <AiOutlineHome/>
    include = 'Hus'
    break;
  case 'Collective':
    icon = <PiUsersThreeLight />
    include = 'Kollektiv'
    break;
  case "Washingmachine":
    icon = <MdOutlineLocalLaundryService />;
    include = "Tvättmaskin"
    break;
  case "Parking":
    icon = <AiOutlineCar />;
    include = "Parkering"
    break;
  case "Wifi":
    icon = <AiOutlineWifi />;
    break;
  case "Balcony":
    icon = <MdBalcony />;
    include = "Balkong"
    break;
  case "Yard":
    icon = <MdOutlineYard />;
    include = "Uteplats"
    break;
  case "Grill":
    icon = <TbGrill />;
    break;
  case "Elevator":
    icon = <PiElevator />;
    include = "Hiss"
    break;
  case "Kitchen":
    icon = <TbToolsKitchen2 />;
    include = "Kök"
    break;
  case "Tv":
    icon = <PiTelevision />;
    include = "TV"
    break;
  case "Desk":
    icon = <GiDesk />;
    include = "Arbetsyta"
    break;
  case "Money":
    icon = <GrMoney />;
    include = "Pengar"
    break;
  case "Map":
    icon = <BiMap />;
    include = "Karta"
    break;
  case "washingmachine":
    icon = <BiSolidWasher />;
    include = "washingmachine"
    break;
  case "bed":
    icon = <IoBedOutline />;
    include = "bed"
    break;
  case "TodayOutline":
    icon = <IoTodayOutline />;
    include = "Idag"
    break;
  case "box":
    icon = <LuBox />;
    include = "box"
    break;
  case "Buildings":
    icon = <BsBuildings />;
    include = "Byggnader"
    break;
  case "DoorOpen":
    icon = <BsDoorOpen />;
    include = "Rum"
    break;
  case "Instagram":
    icon = <BsInstagram />;
    include = "Instagram"
    break;
  case "Linkedin":
    icon = <BsLinkedin />;
    include = "Linkedin"
    break;
  case "AdjustmentsHorizontal":
    icon = <HiAdjustmentsHorizontal />;
    include = "HiAdjustmentsHorizontal"
    break;
  case "Facebook":
    icon = <ImFacebook2 />;
    include = "Facebook"
    break;
  case "Profil":
    icon = <FaUserCircle/>;
    include = "Profil"
    break;
  case "HB":
    icon = <AiOutlineMenu />;
    include = "HB"
    break;
  default:
    break;
}

return (
    <div className='includes-item'>
      <p className='icon'>{icon}</p>
      {showText && <p>{text}</p>}
    </div>
);
}

export default Icon;