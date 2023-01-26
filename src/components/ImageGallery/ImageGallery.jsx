import styles from './imageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ pictures }) {
  return (
    <ul className={styles.ImageGallery}>
      {pictures.map(item => (
        <ImageGalleryItem
          id={item.id}
          url={item.webformatURL}
          title={item.title}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
