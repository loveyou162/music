import { Outlet } from 'react-router-dom';
import classes from './RootAdmin.module.css';
import Header from './Header';
import Navbar from './Navbar';

function RootAdmin() {
  return (
    <div className={classes.rootAdmin}>
      <Header />
      <Navbar />
      <main className={classes.mainAdmin}>
        <Outlet />
      </main>
    </div>
  );
}
export default RootAdmin;
