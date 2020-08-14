import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

const Avatar = (props) => {
  const {
    size, image, style, onClick,
  } = props;
  return (
    <S.Container data-testid="avatar" size={size} onClick={onClick} style={style}>
      <img src={image} alt="avatar" />
    </S.Container>
  );
};

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
  size: 'small',
  style: {},
  onClick: () => { },
};

Avatar.propTypes = {
  size: (props) => {
    const { size } = props;
    if (size !== 'small' && size !== 'medium' && size !== 'large' && size !== 'xlarge') {
      return new Error('Invalid avatar size');
    }
    return null;
  },
  image: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string, PropTypes.string),
  onClick: PropTypes.func,
};

export default Avatar;
