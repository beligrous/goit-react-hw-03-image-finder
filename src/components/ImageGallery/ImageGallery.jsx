import PropTypes from 'prop-types';
import styles from './imageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ pictures }) {
  const list = pictures.map(item => (
    <ImageGalleryItem key={item.id} url={item.webformatURL} title={item.tags} />
  ));
  return <ul className={styles.ImageGallery}>{list}</ul>;
}

export default ImageGallery;

ImageGallery.defaultProps = { pictures: [] };

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
