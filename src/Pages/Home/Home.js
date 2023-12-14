import React from 'react';
import classes from './Home.module.css';
import Navbar from '../../Component/Layout/navbar/navbar';
import MidMain from '../../Component/Layout/MidMain/MidMain';
import MusicRight from '../../Component/Layout/MusicRight/MusicRight';
import MusicPlayer from '../../Component/Layout/MusicPlayer/MusicPlayer';
const Home = () => {
  return (
    <div className={classes.home}>
      <Navbar />
      <MidMain />
      <MusicRight />
      <MusicPlayer className={classes.musicPlayer} />
    </div>
  );
};
export default Home;
