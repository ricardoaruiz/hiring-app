import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu, FiSearch } from 'react-icons/fi';

import { ReactComponent as Logo } from '../../../../assets/logo.svg';
import Avatar from '../../../../components/Avatar';
import Input from '../../../../components/Input';
import * as S from './styles';

const Header = memo(({
  avatar,
  onSearch,
  searchTerm,
  onToggleMenu,
}) => {
  const { t } = useTranslation();

  return (
    <S.Header>
      <S.Logo>
        <FiMenu
          data-testid="menu-icon"
          size={30}
          className="menu"
          onClick={onToggleMenu}
        />
        <Logo />
      </S.Logo>
      <S.Search>
        <Input
          dataTestId="input-search"
          placeholder={t('find')}
          icon={FiSearch}
          onChange={onSearch}
          value={searchTerm}
        />
      </S.Search>
      <S.Avatar>
        {avatar
          ? (<Avatar image={avatar} size="small" />)
          : (<FaUserCircle size={32} />)}
      </S.Avatar>
    </S.Header>
  );
});

Header.defaultProps = {
  avatar: '',
  searchTerm: '',
};

Header.propTypes = {
  avatar: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default Header;
