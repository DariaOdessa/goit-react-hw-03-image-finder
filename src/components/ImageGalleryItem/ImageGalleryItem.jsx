import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { image } = this.props;
    const { webformatURL, tags, largeImageURL } = image;
    const { isModalOpen } = this.state;
    return (
      <GalleryItem>
        <GalleryImage src={webformatURL} alt={tags} onClick={this.openModal} />
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={tags}></img>
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
