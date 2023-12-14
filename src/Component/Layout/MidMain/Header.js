import React from 'react';
import classes from './Header.module.css';
import { Link, json, redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../../store/auth-slice';
import userLayout from '../../../assets/img/logo-icon/user.png';

const Header = () => {
  const dispatch = useDispatch();
  const avtCurrentData = JSON.parse(localStorage.getItem('currentUser'));
  const logoutHandler = async () => {
    localStorage.removeItem('currentUser');
    dispatch(authAction.logout());
    return redirect('/auth?mode=signInWithPassword');
  };
  return (
    <div className={classes.Header}>
      <div className={classes['sub-menu']}>
        <div className={classes['search-group']}>
          <input
            className={classes['search1']}
            type="text"
            placeholder="Tìm kiếm nhạc, video,..."
          />
          <button>
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </div>
        <ul className={classes.account}>
          <li>
            <Link className={classes.settings}>
              <ion-icon name="settings-outline"></ion-icon>
            </Link>
          </li>
          {avtCurrentData && (
            <li>
              <Link className={classes['account-profile']}>
                <img
                  src={
                    avtCurrentData.avatar &&
                    avtCurrentData.avatar[0] &&
                    avtCurrentData.avatar[0].dataURL
                      ? avtCurrentData.avatar[0].dataURL
                      : userLayout
                  }
                  className={classes['acc-image']}
                  alt={avtCurrentData.name}
                  title={avtCurrentData.name}
                />
              </Link>
            </li>
          )}
          {!avtCurrentData && (
            <li>
              <Link
                to="auth?mode=signInWithPassword"
                className={classes['acc-login']}
              >
                Login
              </Link>
            </li>
          )}
          {avtCurrentData && (
            <li>
              <button className={classes['acc-logout']} onClick={logoutHandler}>
                <Link
                  to="auth?mode=signInWithPassword"
                  className={classes['acc-login']}
                >
                  Logout
                </Link>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;

export async function loader() {
  const response = await fetch(
    'https://signup-login-ff3a4-default-rtdb.firebaseio.com/currentUsers.json'
  );
  if (!response.ok) {
    throw json({ message: 'Something went wrong' }, { status: 500 });
  }
  const resData = await response.json();
  console.log(resData);
}
