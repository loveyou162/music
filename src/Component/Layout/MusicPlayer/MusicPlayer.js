import React, { useState, useEffect } from 'react';
import classes from './MusicPlayer.module.css';
const MusicPlayer = () => {
  const [duration, setDuration] = useState(180);
  const [currentTime, setCurrentTime] = useState(60);
  const [audio, setAudio] = useState(null);
  //   useEffect(() => {
  //     const audio = new Audio();
  //     setAudio(audio);
  //     audio.addEventListener('loadedmetadata', () => {
  //       setDuration(audio.duration);
  //     });
  //     audio.addEventListener('timeupdate', () => {
  //       setCurrentTime(audio.currentTime);
  //     });
  //     audio.src =
  //       '../../assets/music/Ai Là Người Thương Em_Quân A.P_-1079249721.mp3';
  //     audio.play();
  //     console.log(audio);
  //   }, []);
  const progress = (currentTime / duration) * 100;
  console.log(progress);
  const playHanler = () => {
    // if (audio.paused) {
    //   audio.play();
    // } else {
    //   audio.pause();
    // }
  };
  return (
    <div className={classes.musicDetail}>
      <div className={classes['info-music']}>
        <img
          src="https://images.unsplash.com/photo-1693132038772-7ad13c7bad9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className={classes['img-music']}
        />
        <div className={classes['info-group']}>
          <p className={classes['name-music']}>
            Nước mắt em lau bằng tình yêu mới
          </p>
          <p className={classes['artist']}>Da LAB, Tóc Tiên</p>
        </div>
      </div>
      <div className={classes['music-player']}>
        <div className={classes['music-player-control']}>
          <div className={classes['music-player-box']}>
            <i className="fa-solid fa-shuffle"></i>
            <i className="fa-solid fa-backward"></i>
            <i className="fa-regular fa-circle-play" onClick={playHanler}></i>
            <i className="fa-solid fa-forward"></i>
            <i className="fa-solid fa-repeat"></i>
          </div>
        </div>
        <div className={classes['progress-bar']}>
          <div
            className={classes['progress']}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className={classes['speaker-volume']}>
        <div className={classes['volume-group']}>
          <ion-icon
            name="volume-high-outline"
            className={classes['volume-icon']}
          ></ion-icon>
          <input type="range" />
        </div>
      </div>
    </div>
  );
};
export default MusicPlayer;
