import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckSquare, FiSquare, FiTrash2 } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import * as S from './styles';

const Menu = memo(({ isOpen, onMenuItemClick }) => {
  const { t } = useTranslation();
  return (
    <>
      <S.SideMenu isOpen={isOpen}>
        <S.Menu>
          <S.MenuItem onClick={onMenuItemClick}>
            <NavLink to="/candidates/list/all" activeClassName="active">
              <FiSquare size={24} />
              <span>{t('all')}</span>
            </NavLink>
          </S.MenuItem>
          <S.MenuItem onClick={onMenuItemClick}>
            <NavLink to="/candidates/list/attended" activeClassName="active">
              <FiCheckSquare size={24} />
              <span>{t('attended')}</span>
            </NavLink>
          </S.MenuItem>
          <S.MenuItem onClick={onMenuItemClick}>
            <NavLink to="/candidates/list/trash" activeClassName="active">
              <FiTrash2 size={24} />
              <span>{t('trash')}</span>
            </NavLink>
          </S.MenuItem>
        </S.Menu>
      </S.SideMenu>
      <S.SideMenuOverlay isOpen={isOpen} onClick={onMenuItemClick} />
    </>
  );
});

Menu.defaultProps = {
  isOpen: false,
  onMenuItemClick: () => { },
};

Menu.propTypes = {
  isOpen: PropTypes.bool,
  onMenuItemClick: PropTypes.func,
};

export default Menu;
