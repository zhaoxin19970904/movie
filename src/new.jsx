import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, List, BackTop } from 'antd';
import { StarOutlined } from '@ant-design/icons';

function New() {
  const [data, setData] = useState({});
  const [starRating, setStarRating] = useState({});

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=dd6df1c5ee27ca15782a9ebcda516743')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleStarColor = (movieId, starIndex) => {
    setStarRating(prev => ({ ...prev, [movieId]: starIndex + 1 }));
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'black',
  };

  const carouselContainerStyle = {
    width: '80%',
    margin: '20px auto',
  };

  const listContainerStyle = {
    width: '80%',
    margin: '20px auto',
  };

  const listItemStyle = {
    borderBottom: '1px solid white',
    padding: '20px',
    color: 'white',
  };

  const imageStyle = {
    display: 'block', // Block display to use margin auto
    marginLeft: 'auto',
    marginRight: 'auto',
    maxHeight: '600px', // Set max height to control image size
    width: 1000, // Adjust width automatically to maintain aspect ratio
  };

  const lastListItemStyle = {
    ...listItemStyle,
    borderBottom: 'none',
  };

  const starIconStyle = {
    cursor: 'pointer',
    color: 'white',
  };

  const activeStarIconStyle = {
    ...starIconStyle,
    color: 'yellow',
  };

  return (
    <div style={containerStyle}>
      <div style={carouselContainerStyle}>
        <Carousel autoplay>
          {data.results ? data.results.map((e) =>
            <div key={e.id}>
              <img src={`https://image.tmdb.org/t/p/original${e.backdrop_path}`} style={imageStyle} alt='Movie Image'/>
              <h3 style={{ color: 'yellow', fontSize:40 }}>{e.title}</h3>
            </div>
          ) : null}
        </Carousel>
      </div>
      <div style={listContainerStyle}>
        <h1 style={{ color: 'orange' }}>Now Playing List</h1>
        <List
          itemLayout="horizontal"
          dataSource={data.results}
          renderItem={(item, index) => (
            <List.Item key={item.id} style={index === data.results.length - 1 ? lastListItemStyle : listItemStyle}>
              <div style={{ display: 'block' }}>
                <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} style={{width:100}} alt='Movie Image' />
              </div>
              <div style={{ display: 'block' }}>
                <div><h3>Name: {item.title}</h3></div>
                <div><h3>Release Date: {item.release_date}</h3></div>
                <div>
                  {[...Array(5)].map((_, starIndex) => (
                    <StarOutlined
                      key={starIndex}
                      onClick={() => toggleStarColor(item.id, starIndex)}
                      style={starRating[item.id] > starIndex ? activeStarIconStyle : starIconStyle}
                    />
                  ))}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <BackTop visibilityHeight={100} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  );
}

export default New;
