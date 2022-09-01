import PropTypes from 'prop-types';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  SearcHeader,
  SearchForm,
  SearchButton,
  SearchIcon,
  SearchLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propeTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  onFormChange = event => {
    const value = event.currentTarget.value.trim();
    this.setState({ value: value });
  };

  onSearchSubmit = event => {
    const { value } = this.state;

    event.preventDefault();
    this.props.handleSubmit(value);

    if (value === '') {
      Notify.warning('Input is still empty, please type something!', {
        width: '400px',
        fontSize: '20px',
        position: 'center-top',
        distance: '50px',
      });
      return;
    }

    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <SearcHeader>
        <SearchForm onSubmit={this.onSearchSubmit}>
          <SearchButton type="submit">
            <SearchLabel>
              <SearchIcon />
            </SearchLabel>
          </SearchButton>

          <Input
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onFormChange}
            value={value}
          />
        </SearchForm>
      </SearcHeader>
    );
  }
}
