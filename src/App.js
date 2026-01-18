import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const redirectList =()=>{
    navigate('/list');
  }
  
  useEffect(() => {
    fetch('http://localhost:8081/files')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div className="main-body">
      <h3>GALLERY -  Daniel, Angelo</h3>
      <div className="main-buttons">
        <button id="lit-btn" onClick={redirectList}> 
          LITERATURE
        </button>
        <button id="gal-btn">
          GALLERY
        </button>
      </div>
    </div>
  );
}

export default App;
