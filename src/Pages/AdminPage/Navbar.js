import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

function Navbar() {
  return (
    <div className={classes.navbar}>
      <NavLink
        to="dashboard"
        className={
          classes.navItem +
          ' ' +
          (({ isActive }) => (isActive ? classes.active : undefined))
        }
      >
        <ion-icon name="home-outline"></ion-icon>
        Dashboard
      </NavLink>
      <NavLink
        to="user"
        className={
          classes.navItem +
          ' ' +
          (({ isActive }) => (isActive ? classes.active : undefined))
        }
      >
        <ion-icon name="person-circle-outline"></ion-icon>
        Người dùng
      </NavLink>
      <NavLink
        to="category"
        className={
          classes.navItem +
          ' ' +
          (({ isActive }) => (isActive ? classes.active : undefined))
        }
      >
        <ion-icon name="layers-outline"></ion-icon>
        Danh mục
      </NavLink>
      <NavLink
        to="song"
        className={
          classes.navItem +
          ' ' +
          (({ isActive }) => (isActive ? classes.active : undefined))
        }
      >
        <ion-icon name="play-circle-outline"></ion-icon>
        Bài Hát
      </NavLink>
      <NavLink
        to="gallery"
        className={
          classes.navItem +
          ' ' +
          (({ isActive }) => (isActive ? classes.active : undefined))
        }
      >
        <ion-icon name="images-outline"></ion-icon>
        Gallery
      </NavLink>
    </div>
  );
}
export default Navbar;
