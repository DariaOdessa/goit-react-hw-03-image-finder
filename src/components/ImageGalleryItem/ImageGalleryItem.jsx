import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
