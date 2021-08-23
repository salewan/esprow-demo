import React from 'react';
import PropTypes from 'prop-types';
import { HalfCircleSpinner } from 'react-epic-spinners'

const Loading = (props) => {
  return props.active ? <HalfCircleSpinner {...props} /> : null;
}

Loading.defaultProps = {
  active: true,
  color: 'black',
  size: 32
}

Loading.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number
}
export default Loading;