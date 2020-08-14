import PropTypes from 'prop-types';
import React from 'react';

import * as S from './styles';

const Input = (props) => {
  const {
    icon: Icon, onChange, value, placeholder, dataTestId,
  } = props;

  return (
    <S.Container>
      {Icon
        && (
          <S.Image data-testid="image">
            <Icon size={24} />
          </S.Image>
        )}
      <S.Input
        data-testid={dataTestId || 'input'}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </S.Container>
  );
};

Input.defaultProps = {
  icon: undefined,
  value: '',
  placeholder: '',
  dataTestId: '',
};

Input.propTypes = {
  icon: PropTypes.elementType,
  dataTestId: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
