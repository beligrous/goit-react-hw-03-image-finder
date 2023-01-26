import styles from './imageGalleryItem.module.css';

function ImageGalleryItem({ id, url, title }) {
  return (
    <li key={id} className={styles.ImageGalleryItem}>
      <img className={styles.ImageGalleryItemImage} src={url} alt={title} />
    </li>
  );
}

export default ImageGalleryItem;
