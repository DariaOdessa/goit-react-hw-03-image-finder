import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from '../components/Loader/Loader';
import { getImages } from 'services/api';

export class App extends Component {
  state = {
    currentQuery: '',
    images: [],
    currentPage: 1,
    status: 'idle',
    totalHits: null,
    imageURL: '',
    showModal: false,
  };

  onFormSubmit = query => {
    this.setState({
      currentQuery: query,
      images: [],
      currentPage: 1,
      status: 'idle',
    });
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { currentQuery, currentPage } = this.state;
      if (
        prevState.currentPage !== currentPage ||
        prevState.currentQuery !== currentQuery
      ) {
        this.setState({ status: 'pending' });
        const data = await getImages(currentQuery, currentPage);
        const { hits, totalHits } = data;

        if (totalHits === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ status: 'resolved' });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
        this.setState({ totalHits: totalHits });
        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  }

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  getImageURL = largeImageURL => {
    this.setState({ imageURL: largeImageURL });
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, status, totalHits, showModal, imageURL } = this.state;

    return (
      <AppWrapper>
        <Searchbar handleSubmit={this.onFormSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.getImageURL} />
        )}
        {status === 'resolved' &&
          images.length % 12 === 0 &&
          totalHits.length !== 0 && (
            <Button text={'Load more'} onClick={this.onLoadMoreBtnClick} />
          )}
        {status === 'pending' && <Loader />}
        {showModal && <Modal onClose={this.closeModal} src={imageURL}></Modal>}

        <GlobalStyle />
      </AppWrapper>
    );
  }
}
