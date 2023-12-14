import React, { useState, useEffect } from 'react';
import classes from './MidMain.module.css';
import Header from './Header';
import data from '../../../JSON/youtube/youtubeData.json';
import YouTube from 'react-youtube';
import ListMusic from './ListMusic/ListMusic';
const MidMain = () => {
  const [idVideo, setIdVideo] = useState('');

  // console.log(dataVideos);
  const dataVideos = data.video;
  // useEffect(() => {
  //   if (dataVideos.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * dataVideos.length - 1);
  //     console.log('index', randomIndex);
  //     const randomVideo = dataVideos[randomIndex - 1].id;
  //     console.log(randomVideo);
  //     const title = dataVideos[randomIndex - 1].title;
  //     console.log('title: ', title);
  //     // console.log('random video: ', randomVideo);
  //     setIdVideo(randomVideo);
  //   }
  // }, [dataVideos]);
  console.log(idVideo);
  const opts = {
    height: '476',
    width: '1024',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div className={classes.midMain}>
      <Header />
      <ListMusic />
    </div>
  );
};
export default MidMain;
