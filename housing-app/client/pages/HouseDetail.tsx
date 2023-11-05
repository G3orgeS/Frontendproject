import { useParams, Link } from 'react-router-dom';
import { House } from '../types/house';
import { getHouseById } from '../data/houseApi';
import '../css/pages/HouseDetail.css';
import InfoContainer from '../components/InfoContainer';
import DetailImg from '../components/DetailImg';
import { useEffect, useState } from 'react';
import Icon from '../components/icons/Icon';
import Loader from '../components/global/Loader';
import Summary from '../components/Summary'
const logo = '../resource/loga.jpg'

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
        <div className="housedetailinfowrapper">
          <div className="titeldetailwrapper">
            <h1>{house.adress}</h1>
          </div>
          <div className="descriptionContainer">
            <div className="infowrapper">
              <div className="detailcost">
                <p>{house.cost} kr</p>
              </div>
              <div className="infoborderdetail">
                <div className="detailroom">
                  <p>{house.numberOfRooms} RoK</p>
                </div>
              </div>
              <div className="infoborderdetail">
                <div className="detailsize">
                  <p>{house.size} kvm</p>
                </div>
              </div>
            </div>
            <div className="description">
              <p dangerouslySetInnerHTML={{ __html: house.description }} />
            </div>
          </div>
        </div>
        <div className="descriptionContainer2">
          <img src={logo} alt="studystaylogo" />
          <div className="summarybox">
            <Summary city={house.city} floor={house.floor} firstDate={new Date(house.firstDate).toLocaleDateString()} landlord={house.landlord[0]} rating={house.recommendation} />
            <div className='detailsummarybtn'>
              <Link id='detailsummarybtnwhite' to={`/application/${id}`}>Till ansökan</Link>
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