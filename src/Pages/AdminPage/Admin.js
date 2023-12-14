import { Outlet } from 'react-router-dom';
import classes from './Admin.module.css';
// import PageContent from './PageContent';

function Admin() {
  return (
    <div className={classes.admin}>
      <Outlet />
    </div>
  );
}
export default Admin;
