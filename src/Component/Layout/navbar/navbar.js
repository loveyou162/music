import React, { memo } from 'react';
import classes from './navbar.module.css';
import data from './DummyModule.json';
import logoIcon from '../../../assets/img/logo-icon/logo-chinh22.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className={classes['navbar-left']}>
      <img className={classes['logo-image']} src={logoIcon} alt="" />
      <div id="menu-box">
        <ul className={classes['menu_box']}>
          {data.MODULE[0].module1.map(module => (
            <li className={classes['menu-item']}>
              <Link className={classes['menu-link']} to={module.link}>
                <ion-icon
                  className={classes['sub-icon']}
                  name={module.name}
                ></ion-icon>
                <p>{module.title}</p>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={classes['menu_box2']}>
          {data.MODULE[1].module2.map(module => (
            <li className={classes['menu-item']}>
              <Link className={classes['menu-link']} to={module.link}>
                <ion-icon
                  className={classes['sub-icon']}
                  name={module.name}
                ></ion-icon>
                <p>{module.title}</p>
              </Link>
            </li>
          ))}
        </ul>

        <button className={classes['btn-playlist']}>
          <ion-icon
            className={classes['sub-icon']}
            name="add-outline"
          ></ion-icon>
          <p>Tạo Playlist Mới</p>
        </button>
      </div>
    </div>
  );
};
export default memo(Navbar);
