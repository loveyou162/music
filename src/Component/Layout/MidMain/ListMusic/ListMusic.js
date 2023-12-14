import classes from './ListMusic.module.css';
import Gallery from './Gallery';
export default function ListMusic() {
  return (
    <div className={classes.listMusic}>
      <Gallery />
    </div>
  );
}
