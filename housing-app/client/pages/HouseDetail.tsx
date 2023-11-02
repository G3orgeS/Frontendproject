import { useParams, Link } from 'react-router-dom';
import { House } from '../types/house';
import { getHouseById } from '../data/houseApi';
import '../css/pages/HouseDetail.css';
import InfoContainer from '../components/InfoContainer';
import DetailImg from '../components/DetailImg';
import { useEffect, useState } from 'react';
import Icon from '../components/icons/Icon';
import Loader from '../components/Loader';
import Summary from '../components/Summary'

const HouseDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getHouseById(id)
        .then((data) => {
          setHouse(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching house data:', error);
        });
    }
  }, [id]);

  if (!house) {
    return loading && <Loader />
  }

  const parsedDate = new Date(house.firstDate);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}-${year}`;

  return (
    <>
      <div className="houseDetailContainer">
        <DetailImg house={house} />
        <InfoContainer house={house} formattedDate={formattedDate} />
        <div className="imageRow">
          {house.img.slice(0, 4).map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    <div className='oversightwrapper'>


      <div className="descriptionContainer">
        <h1>{house.titel}</h1>
        <div className="infowrapper">
          <p>{house.cost} kr</p>
          <p>{house.numberOfRooms} RoK</p>
          <p>{house.size} kvm</p>
        </div>
        <div className="description">
          <p>Description: {house.description}</p>
          <p>Placeholdertext för att fylla ut: </p>
          <p>Denna mysiga lägenhet har öppen planlösning mellan kök och vardagsrumrum som ger sociala ytor med plats för umgänge. Väggarna är målade väggar i ljus kulör, och golvet är genomgående parkettgolv. I hallen är det grå klinker vid entrédörren. Till lägenheten hör en uteplats som vetter in mot den gemensamma innergården.  Det helkaklade badrummet är utrustat med tvättmaskin, torktumlare, handdukstork och dusch med duschväggar i glas. Köket har vita skåpluckor, glashällsspis med varmluftsugn och diskmaskin.        Lägenheten ligger i en modern och energieffektiv fastighet och varje lägenhet har individuell mätning för el- och vattenförbrukning, därmed betalar du endast för det du själv förbrukar och har större möjlighet att påverka kostnaderna. Kostnaden debiteras separat på din hyresavi. Garageplats finns att hyra separat i mån av ledig plats. Information kring lägenheten finner du/ni i annonsen, vi har dessvärre
              inte möjlighet att besvara på ytterligare frågor om lägenheten innan du som sökande får ett ev. erbjudande om visning. Välkommen med din ansökan!</p>
        </div>
      </div>

<div className="descriptionContainer2">
  <div className="summarybox">
          <Summary city={house.city} floor={house.floor} moveInDate={house.firstDate} applyBy={'12/12-2023'} landlord={house.landlord[0]} rating={house.recommendation} />
          <div className="btncont">
        <Link to={`/application/${id}`} className="applybtn">
          Till ansökan
        </Link>
      </div>
      </div>
          <div className="summaryicons">
          {house.extras.map((extra, index) => (
            <div key={index} className='extras'>
              <Icon showText={true} include={extra} />
            </div>
          ))}
          </div>
</div>
    </div>
    </>
  );
};

export default HouseDetail;