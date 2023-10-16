import { IconType } from 'react-icons';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaWifi, FaFire, FaCar, FaWarehouse, FaBath, FaRecycle, FaTree, FaAnchor, FaShower, FaFirstAid, FaLaptop, FaSubway, FaChargingStation, FaBus, FaBowlingBall, FaBed, FaBan, FaMapMarker, FaCalendar, FaCube, FaBed as FaDoubleBed, FaMoneyBill, FaBuilding, FaDoorOpen, FaUsers, FaHome, FaFilter, FaUser } from 'react-icons/fa';

type IconName = keyof typeof iconMap;

const iconMap = {
  'wifi':               FaWifi,
  'fire-burner':        FaFire,
  'square-parking':     FaCar,
  'warehouse':          FaWarehouse,
  'bath':               FaBath,
  'recycle':            FaRecycle,
  'tree':               FaTree,
  'anchor':             FaAnchor,
  'shower':             FaShower,
  'kit-medical':        FaFirstAid,
  'computer':           FaLaptop,
  'train-subway':       FaSubway,
  'charging-station':   FaChargingStation,
  'bus':                FaBus,
  'bowling-ball':       FaBowlingBall,
  'bed':                FaBed,
  'ban-smoking':        FaBan,
  'location-dot':       FaMapMarker,
  'calendar-days':      FaCalendar,
  'cube':               FaCube,
  'double-bed':         FaDoubleBed,
  'money-bill':         FaMoneyBill,
  'building':           FaBuilding,
  'door-open':          FaDoorOpen,
  'users':              FaUsers,
  'house':              FaHome,
  'filter':             FaFilter,
  'facebook':           FaFacebook,
  'instagram':          FaInstagram,
  'linkedin':           FaLinkedin,
  'user':               FaUser,
};

const FontAw = ({ iconName, textVisible = false }: { iconName: IconName; textVisible?: boolean }) => {
  const SelectedIcon = iconMap[iconName] as IconType;
  
  if (!SelectedIcon) {
    return <div>Ingen ikon vald</div>;
  }

  return (
    <div>
      <SelectedIcon />
      {textVisible && <p>{iconName}</p>}
    </div>
  );
};

export default FontAw;
