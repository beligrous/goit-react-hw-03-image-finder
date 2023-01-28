import PropTypes from 'prop-types';
import styles from './imageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ pictures }) {
  const list = pictures.map(item => (
    <ImageGalleryItem id={item.id} url={item.webformatURL} title={item.title} />
  ));
  return <ul className={styles.ImageGallery}>{list}</ul>;
}

export default ImageGallery;

ImageGallery.defaultProps = { pictures: [] };

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
