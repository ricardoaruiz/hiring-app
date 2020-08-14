import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FiCalendar, FiChevronLeft, FiKey, FiMail, FiPhoneCall, FiUser,
} from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import avatar from '../../../assets/avatar.png';
import Avatar from '../../../components/Avatar';
import * as S from './styles';

const CandidateProfile = ({ candidates }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useHistory();
  const [candidate, setCandidate] = useState(undefined);
  const [info, setInfo] = useState({
    label: '',
    value: '',
  });

  const setCandidateInfo = useCallback((field) => {
    if (field) {
      const { label, value } = candidate[field];
      setInfo({ label, value });
      return;
    }
    setInfo({
      label: '',
      value: '',
    });
  }, [candidate]);

  useEffect(() => {
    Object.keys(candidates).forEach((key) => {
      const found = candidates[key].data.find((c) => c._id === id);
      if (found) {
        setCandidate({
          image: { label: '', value: found.largePicture },
          name: { label: t('Hi, my name is'), value: `${found.name} ${found.lastName}` },
          email: { label: t('My e-mail is'), value: found.email },
          dateOfBirth: { label: t('My birthday is'), value: new Date(found.dateOfBirth).toLocaleDateString() },
          address: { label: t('My address is'), value: found.address },
          phone: { label: t('My phone is'), value: found.phone },
          password: { label: t('My password is'), value: found.password },
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.CentralCard>
        <S.CardHeader>
          <S.AvatarContainer>
            <Avatar
              image={candidate ? candidate.image.value : avatar}
              size="xlarge"
            />
          </S.AvatarContainer>
        </S.CardHeader>
        <S.CardBody>
          {candidate
            ? (
              <S.DataContainer data-testid="data-container">
                <S.DataInfo>
                  <S.DataInfoLabel data-testid="info-label">{info.label}</S.DataInfoLabel>
                  <S.DataInfoValue data-testid="info-value">{info.value}</S.DataInfoValue>
                </S.DataInfo>

                <S.DataIcons>
                  <FiUser
                    data-testid="user-icon"
                    size={35}
                    onClick={() => setCandidateInfo('name')}
                    onMouseEnter={() => setCandidateInfo('name')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                  <FiMail
                    data-testid="mail-icon"
                    size={35}
                    onClick={() => setCandidateInfo('email')}
                    onMouseEnter={() => setCandidateInfo('email')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                  <FiCalendar
                    data-testid="calendar-icon"
                    size={35}
                    onClick={() => setCandidateInfo('dateOfBirth')}
                    onMouseEnter={() => setCandidateInfo('dateOfBirth')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                  <GoLocation
                    data-testid="location-icon"
                    size={35}
                    onClick={() => setCandidateInfo('address')}
                    onMouseEnter={() => setCandidateInfo('address')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                  <FiPhoneCall
                    data-testid="phone-icon"
                    size={35}
                    onClick={() => setCandidateInfo('phone')}
                    onMouseEnter={() => setCandidateInfo('phone')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                  <FiKey
                    data-testid="key-icon"
                    size={35}
                    onClick={() => setCandidateInfo('password')}
                    onMouseEnter={() => setCandidateInfo('password')}
                    onMouseLeave={() => setCandidateInfo()}
                  />
                </S.DataIcons>
              </S.DataContainer>
            )
            : (<S.ProfileNotFound data-testid="candidate-notfound">{t('Candidate not found')}</S.ProfileNotFound>)}
        </S.CardBody>
      </S.CentralCard>
      <S.BackButton
        data-testid="goback-button"
        onClick={() => location.goBack()}
      >
        <FiChevronLeft size={24} />
      </S.BackButton>
    </S.Container>
  );
};

CandidateProfile.propTypes = {
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
  }).isRequired,
};

const mapStateToProps = (state) => ({
  candidates: {
    all: state.candidates.all,
    attended: state.candidates.attended,
    trash: state.candidates.trash,
  },
});

export default connect(mapStateToProps)(CandidateProfile);
