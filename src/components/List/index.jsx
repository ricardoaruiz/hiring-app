import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import * as S from './styles';

const List = (props) => {
  const { t } = useTranslation();
  const { data, onRowClick } = props;

  const handleLineClick = useCallback((id) => {
    if (id) {
      onRowClick(id);
    }
  }, [onRowClick]);

  return (
    data.length
      ? (
        <S.List>
          {data.map((row) => {
            const id = row._id ? row._id.value : undefined;
            const rowKey = uuid();

            return (
              <S.ListRow key={rowKey} onClick={() => handleLineClick(id)} hasId={!!id}>
                {Object.keys(row).map((field) => {
                  const colKey = `${rowKey}_${uuid()}`;
                  const { value, width } = row[field];

                  if (field !== 'actions') {
                    return (
                      <S.ListCol
                        key={colKey}
                        isId={field.startsWith('_')}
                        width={width}
                      >
                        {value}
                      </S.ListCol>
                    );
                  }

                  return id
                    && (
                      <S.ListCol key={colKey} className="actionCol">
                        {row[field].value.map((action) => {
                          const actionKey = `${colKey}_${uuid()}`;
                          const { handleAction, icon: Icon } = action;
                          return (
                            <S.ListAction key={actionKey}>
                              <Icon
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleAction(id);
                                }}
                                size={25}
                              />
                            </S.ListAction>
                          );
                        })}
                      </S.ListCol>
                    );
                })}
              </S.ListRow>
            );
          })}
        </S.List>
      ) : (
        <S.EmptyList>
          {t('No data found')}
        </S.EmptyList>
      )
  );
};

List.defaultProps = {
  onRowClick: () => { },
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
};

export default List;
