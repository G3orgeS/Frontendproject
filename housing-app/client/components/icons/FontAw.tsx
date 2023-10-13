import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faWifi, faFireBurner, faSquareParking, faWarehouse, faBath, faRecycle, faTree, faAnchor, faShower, faPhoneFlip, faKitMedical, faComputer, faTrainSubway, faChargingStation, faBus, faBowlingBall, faBed, faBanSmoking, faLocationDot, faCalendarDays, faCube, faBed as faDoubleBed, faMoneyBill, faBuilding, faDoorOpen, faUsers, faHouse, faFilter, faUser } from '@fortawesome/free-solid-svg-icons';

type IconName = keyof typeof iconMap;

const iconMap = {
  'wifi':               faWifi,
  'fire-burner':        faFireBurner,
  'square-parking':     faSquareParking,
  'warehouse':          faWarehouse,
  'bath':               faBath,
  'recycle':            faRecycle,
  'tree':               faTree,
  'anchor':             faAnchor,
  'shower':             faShower,
  'phone-flip':         faPhoneFlip,
  'kit-medical':        faKitMedical,
  'computer':           faComputer,
  'train-subway':       faTrainSubway,
  'charging-station':   faChargingStation,
  'bus':                faBus,
  'bowling-ball':       faBowlingBall,
  'bed':                faBed,
  'ban-smoking':        faBanSmoking,
  'location-dot':       faLocationDot,
  'calendar-days':      faCalendarDays,
  'cube':               faCube,
  'double-bed':         faDoubleBed,
  'money-bill':         faMoneyBill,
  'building':           faBuilding,
  'door-open':          faDoorOpen,
  'users':              faUsers,
  'house':              faHouse,
  'filter':             faFilter,
  'facebook':           faFacebook,
  'instagram':          faInstagram,
  'linkedin':           faLinkedin,
  'user':               faUser,
};

const FontAw = ({ iconName, textVisible = false }: { iconName: IconName; textVisible?: boolean }) => {
  const selectedIcon = iconMap[iconName];
  
  if (!selectedIcon) {
    return <div>Ingen ikon vald</div>;
  }

  return (
    <div>
      <FontAwesomeIcon icon={selectedIcon} />
      {textVisible && <p>{iconName}</p>}
    </div>
  );
};

export default FontAw;
