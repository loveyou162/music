import classes from './Popup.module.css';
import { uiAction } from '../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

function Popup() {
  const dispatch = useDispatch();
  const show = useSelector(state => state.ui.showPopup);
  console.log(show);
  return (
    <div className={classes.popup}>
      <div className={classes.backdrop}></div>
      <div className={classes['album-content']}>
        <p className={classes['note-warning']}>
          Bạn có muộn phát bài hát này? Danh phát hiện tại sẽ bị thay thế
        </p>
        <div className={classes['info-album']}>
          <img src="" alt="" />
          <h4>Em chỉ im lặng</h4>
          <p>OSAD, pháo</p>
        </div>
        <div className={classes['group-btn']}>
          <button>
            <i class="fa-solid fa-play"></i>
            Phát bài hát này
          </button>
          <button>Thêm vào danh sách phát</button>
          <button>Bỏ Qua</button>
        </div>
      </div>
    </div>
  );
}
export default Popup;
