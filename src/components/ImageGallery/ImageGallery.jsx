import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
