import classes from './Gallery.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Gallery1 from '../../../../assets/img/banner/gallery1.jpg';
import Gallery2 from '../../../../assets/img/banner/gallery2.jpg';
import Gallery3 from '../../../../assets/img/banner/gallery3.jpg';
import Gallery4 from '../../../../assets/img/banner/gallery4.jpg';
import { useDispatch } from 'react-redux';
import { uiAction } from '../../../../store/ui-slice';
function Gallery() {
  const dispatch = useDispatch();
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const showPopup = product => {
    dispatch(uiAction.selectedAlbum(product));
    dispatch(uiAction.showPopup());
  };

  return (
    <Slider {...settings} className={classes['custom-slider']}>
      <div className={classes['gallery-item']}>
        <img src={Gallery1} />
      </div>
      <div className={classes['gallery-item']}>
        <img src={Gallery2} />
      </div>
      <div className={classes['gallery-item']}>
        <img src={Gallery3} />
      </div>
      <div className={classes['gallery-item']}>
        <img src={Gallery4} />
      </div>
      {/* Thêm nhiều slides khác tại đây */}
    </Slider>
  );
}

export default Gallery;
