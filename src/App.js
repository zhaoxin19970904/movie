import logo from './logo.svg';
import React from 'react';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Menu } from 'antd';
import axios from 'axios'
import New from './new'
import Sec from './sec'
import Searchf from './search'
import Searchn from './search2'
import Item from './item'
import Person from './person'
import Reduxtut from './reduxtut'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/inputs/store'


function App() {

  const [current, setCurrent] = useState('home');
  const [data,setData]=useState({});

  const onClick = (e) => {
 
    console.log('click ', e);
    setCurrent(e.key);

  };

  const items = [
    {
      label: (
      <Link to="/" >
        Home
      </Link>
    ),
      key: 'home',
    },
    {
      label: (
        <Link to="/movies"  >
          Movie
        </Link>
      ),
      key: 'movie',
    },
    {
      label: (
        <Link to="/searchf/" >
          Search
        </Link>
      ),
      key: 'search',
    },
    {
      label: (
        <Link to="/searchn/" >
          Search2
        </Link>
      ),
      key: 'searchn',
    },
  
  ]
  const handleDataChange = (newData) => {
    setData(newData);
  };
  

  return (
    <div className="App">

      <BrowserRouter>
      <div>
        
      </div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{}} />
      <Routes>
        <Route path="/" >
          <Route index element={<New />} />
          <Route path="/movies" element={<Sec data={data} onDataChange={handleDataChange}/>} />
            <Route path="/movies/:id" element={<Item />} />
            <Route path="/person/:id" element={<Person />} />

          <Route path="/searchf" element={<Searchf data={data} onDataChange={handleDataChange}/>} />
          <Route path="/searchn" element={<Searchn data={data} onDataChange={handleDataChange}/>} />
          <Route path="/redux" element={<Reduxtut/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
