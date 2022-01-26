import { useEffect, useState } from 'react';
import './Cities.css';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const Cities = () => {
  const [cities, setDetails] = useState(null);
  const dispatch = useDispatch();
  const [selectedmegye, setMegye] = useState(null);

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
      setDetails(data.cities);
    }
  }, []); //prevent multiple refresh

  if (cities) {
    return (
      <div className='parent-container'>
        <div><button onClick={quit}>Kilépés</button></div>
        <h1>Városok</h1>
      <div className='container'>
        {cities.map(city =>
          <div key={city.id} className='card'>
            <div className='header'>
              <strong><p>{city.vnev}</p></strong>
            </div>
            <p>Város azonosító: {city.id}</p>
            <p>Megye azonosító: {city.megyeid}</p>
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

  function quit() {
    dispatch(logout());
  }

}

export default Cities;