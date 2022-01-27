import { useEffect, useState } from 'react';
import './Cities.css';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { citybymegye, loginSite, logoutSite } from '../../store/slices/siteInfo';
import { selectUser } from '../../store/slices/userSlice';

const Cities = () => {
  const [cities, setDetails] = useState(null);
  const dispatch = useDispatch();
  const [selectedmegye, setMegye] = useState(null);
  const [searchParams] = useSearchParams();
  const searchMegye = searchParams.get('megye') || '';
  const user = useSelector(selectUser);

  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch('http://localhost:4000/cities',
        {
          method: 'get',
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
      const data = await response.json();
      searchMegye !== '' ?
        setDetails(data.cities.filter(city => city.megyeid === searchMegye))
        :
        setDetails(data.cities);

    }
  }, [selectedmegye, searchMegye]);

  if (searchMegye !== '') {
    dispatch(citybymegye());
  }

  if (cities && selectedmegye === null) {
    return (
      <div className='parent-container'>
        <div>  <Link onClick={GoBack} to="/userpage"><button>Vissza</button></Link></div>
        <h1>Városok</h1>
        <div className='container'>
          {cities.map(city =>
            <div key={city.id} className='card' style={{ borderColor: 'black' }} data-megye={city.megyeid} onClick={highLightSimilars}>
              <div className='header' value={city.megyeid}>
                <strong value={city.megyeid}><p value={city.megyeid}>{city.vnev}</p></strong>
              </div>
              <p value={city.megyeid}>Város azonosító: {city.id}</p>
              <p value={city.megyeid}>Megye azonosító: {city.megyeid}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (cities && selectedmegye) {
    return (
      <div className='parent-container'>
        <div><Link onClick={GoBack} to="/userpage"><button>Vissza</button></Link></div>
        <h1>Városok</h1>
        <div className='container'> {/* conditional mapping based on selected value */}
          {cities.map(city => city.megyeid === selectedmegye ?
            <div key={city.id} className='card' style={{ borderColor: 'lime' }} data-megye={city.megyeid} onClick={highLightSimilars}>
              <div className='header' value={city.megyeid} onClick={highLightSimilars}>
                <strong value={city.megyeid}><p value={city.megyeid}>{city.vnev}</p></strong>
              </div>
              <p value={city.megyeid}>Város azonosító: {city.id}</p>
              <p value={city.megyeid}>Megye azonosító: {city.megyeid}</p>
            </div>
            :
            <div key={city.id} className='card' style={{ borderColor: 'black' }} data-megye={city.megyeid} onClick={highLightSimilars}>
              <div className='header' value={city.megyeid}>
                <strong value={city.megyeid}><p value={city.megyeid}>{city.vnev}</p></strong>
              </div>
              <p value={city.megyeid}>Város azonosító: {city.id}</p>
              <p value={city.megyeid}>Megye azonosító: {city.megyeid}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className='parent-container'>
      <p>Loading data...</p>
    </div>
  );

  function highLightSimilars(event) {
    event.preventDefault();
    setMegye(event.currentTarget.dataset.megye);
  }

  function GoBack() {
    user ? dispatch(loginSite()) : dispatch(logoutSite());
  }

}

export default Cities;