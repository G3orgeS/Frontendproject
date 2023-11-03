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
import Button from '../components/Button';


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
            <p dangerouslySetInnerHTML={{__html: house.description}}/>
          </div>
        </div>

        <div className="descriptionContainer2">
          <div className="summarybox">
            <Summary city={house.city} floor={house.floor} moveInDate={house.firstDate} applyBy={'12/12-2023'} landlord={house.landlord[0]} rating={house.recommendation} />
            <div className="btncont">
            <Button to={`/application/${id}`}>
            Till ansökan
            </Button>
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