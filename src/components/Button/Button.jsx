import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ text, onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      {text}
    </LoadMoreButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
