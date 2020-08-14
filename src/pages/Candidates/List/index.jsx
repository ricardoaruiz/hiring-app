import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckSquare, FiSquare, FiTrash2 } from 'react-icons/fi';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDebounce } from 'use-debounce';

import Avatar from '../../../components/Avatar';
import List from '../../../components/List';
import {
  changeSearchTerm,
  listAllFromApi,
  sendToAll,
  sendToAttended,
  sendToTrash,
} from '../../../redux/actions/candidatesActions';
import { login } from '../../../redux/actions/userActions';
import Header from './Header';
import Menu from './Menu';
import * as S from './styles';

const CandidatesList = (props) => {
  const {
    loggedUser,
    candidates,
    login: doLogin,
    listAllFromApi: load,
    sendToTrash: sendTrash,
    sendToAttended: sendAttended,
    sendToAll: sendAll,
    changeSearchTerm: setSearchTerm,
  } = props;

  const { t } = useTranslation();
  const history = useHistory();
  const { type } = useParams();

  // From redux
  const { all, searchTerm, loading } = candidates;

  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTermDebounced] = useDebounce(searchTerm, 1000);

  const handleSendToTrash = useCallback((candidateId) => {
    sendTrash(candidateId);
  }, [sendTrash]);

  const handleSendToAttended = useCallback((candidateId) => {
    sendAttended(candidateId);
  }, [sendAttended]);

  const handleSendToAll = useCallback((candidateId) => {
    sendAll(candidateId);
  }, [sendAll]);

  const loadMore = useCallback(() => {
    load({ results: 5 });
  }, [load]);

  const showDetails = useCallback((candidateId) => {
    history.push(`/candidates/profile/${candidateId}`);
  }, [history]);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, [setSearchTerm]);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((state) => !state);
  }, []);

  const handleMeuItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const loadCandidates = useCallback(() => {
    const arrCandidates = candidates[type].data.map((candidate) => {
      const {
        _id, picture, name, phone, location, email,
      } = candidate;
      return {
        _id: { value: _id },
        picture: {
          value: <Avatar
            image={picture}
            size="medium"
          />,
          width: '20rem',
        },
        name: { value: name },
        email: { value: email },
        phone: { value: phone },
        location: { value: location },
        actions: {
          value: [
            { handleAction: handleSendToAll, icon: FiSquare },
            { handleAction: handleSendToAttended, icon: FiCheckSquare },
            { handleAction: handleSendToTrash, icon: FiTrash2 },
          ],
        },
      };
    });
    setData(arrCandidates);
    setFilteredData(arrCandidates);
  }, [candidates, handleSendToAll, handleSendToAttended, handleSendToTrash, type]);

  useEffect(() => {
    if (!loggedUser.isLogged) {
      doLogin();
    }
    if (!all.data.length) {
      load({ results: 5 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  useEffect(() => {
    if (!searchTermDebounced) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const name = String(item.name.value);
      const email = String(item.email.value);

      return name.includes(searchTermDebounced.toLowerCase())
        || email.includes(searchTermDebounced.toLowerCase());
    });

    setFilteredData(filtered);
  }, [data, searchTermDebounced]);

  return (
    <S.Container>
      <Header
        avatar={loggedUser.image}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onToggleMenu={handleToggleMenu}
      />
      <Menu
        isOpen={isMenuOpen}
        onMenuItemClick={handleMeuItemClick}
      />
      <S.Content>
        <List
          data={filteredData}
          onRowClick={showDetails}
        />
        {type === 'all' && !!filteredData.length && (
          <S.LoadMore>
            <button
              type="button"
              onClick={() => loadMore(all.currentPage + 1)}
              disabled={loading}
            >
              {loading ? t('loading') : t('load more')}
            </button>
          </S.LoadMore>
        )}
      </S.Content>
    </S.Container>
  );
};

CandidatesList.propTypes = {
  loggedUser: PropTypes.object.isRequired,
  candidates: PropTypes.shape({
    all: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      data: PropTypes.array.isRequired,
    }),
    attended: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      data: PropTypes.array.isRequired,
    }),
    trash: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      data: PropTypes.array.isRequired,
    }),
    loading: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  listAllFromApi: PropTypes.func.isRequired,
  changeSearchTerm: PropTypes.func.isRequired,
  sendToTrash: PropTypes.func.isRequired,
  sendToAttended: PropTypes.func.isRequired,
  sendToAll: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUser: state.user,
  candidates: state.candidates,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
  listAllFromApi,
  changeSearchTerm,
  sendToTrash,
  sendToAttended,
  sendToAll,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CandidatesList);
