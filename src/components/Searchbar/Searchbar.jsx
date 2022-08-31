import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  SearcHeader,
  SearchForm,
  SearchButton,
  SearchIcon,
  SearchLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  const onSearchSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.input;
    if (query.value.trim() === '') {
      Notify.warning('Input is still empty, please type something!', {
        width: '400px',
        fontSize: '20px',
        position: 'center-top',
        distance: '50px',
      });
      return;
    }
    handleSubmit(query.value);
  };

  return (
    <SearcHeader>
      <SearchForm onSubmit={onSearchSubmit}>
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
        />
      </SearchForm>
    </SearcHeader>
  );
};

Searchbar.propeTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
