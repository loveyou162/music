import classes from './Header.module.css';

function Header() {
  return (
    <div className={classes.header}>
      <h3>Admin</h3>
      <div className={classes['button-logout']}>
        <button>Đăng xuất</button>
      </div>
    </div>
  );
}
export default Header;
