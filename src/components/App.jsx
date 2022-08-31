import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from '../components/Loader/Loader';
import { getImages } from 'services/api';

export class App extends Component {
  state = {
    currentQuery: '',
    images: [],
    currentPage: 1,
    status: 'idle',
    totalHits: null,
  };

  onFormSubmit = query => {
    this.setState({
      currentQuery: query,
      images: [],
      currentPage: 1,
      status: 'idle',
    });
  };

  // onFormReset() {
  //   this.setState({
  //     currentQuery: '',
  //   });
  // }

  async componentDidUpdate(_, prevState) {
    try {
      const { currentQuery, currentPage } = this.state;
      if (
        prevState.currentPage !== currentPage ||
        prevState.currentQuery !== currentQuery
      ) {
        this.setState({ status: 'pending' });
        const data = await getImages(currentQuery, currentPage);
        console.log(data);
        const { hits, total } = data;

        if (total === 0 || (hits.length === 0 && hits.totalHits > 0)) {
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ status: 'resolved' });
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
        this.setState({ totalHits: total });
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

  render() {
    const { images, status, totalHits } = this.state;

    return (
      <AppWrapper>
        <Searchbar handleSubmit={this.onFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'resolved' &&
          images.length % 12 === 0 &&
          totalHits.length !== 0 && (
            <Button text={'Load more'} onClick={this.onLoadMoreBtnClick} />
          )}
        {status === 'pending' && <Loader />}

        <GlobalStyle />
      </AppWrapper>
    );
  }
}
