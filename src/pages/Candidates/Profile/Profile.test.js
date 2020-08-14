import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../../themes';

import Profile from '.';

const mockStore = configureStore([]);

const idAll = '123';
const idAttendend = '456';
const idTrash = '789';

const dataStore = {
  all: {
    currentPage: 0,
    data: [
      {
        _id: '123',
        picture: 'http://image.com/10.jpg',
        largePicture: 'http://image.com/10l.jpg',
        name: 'Candidate 01',
        lastName: 'Last Name C01',
        dateOfBirth: '2000-07-22 15:33:00',
        phone: '(19)999455555',
        email: 'c01@email.com',
        address: '127 Rua abc',
        location: 'SP Campinas',
        password: '123456',
      },
    ],
  },
  attended: {
    currentPage: 0,
    data: [
      {
        _id: '456',
        picture: 'http://image.com/10.jpg',
        largePicture: 'http://image.com/10l.jpg',
        name: 'Candidate 02',
        lastName: 'Last Name C02',
        dateOfBirth: '2000-01-12 15:33:00',
        phone: '(19)995448895',
        email: 'c01@email.com',
        address: '127 Rua xyz',
        location: 'SP Campinas',
        password: '654321',
      },
    ],
  },
  trash: {
    currentPage: 0,
    data: [
      {
        _id: '789',
        picture: 'http://image.com/10.jpg',
        largePicture: 'http://image.com/10l.jpg',
        name: 'Candidate 02',
        lastName: 'Last Name C02',
        dateOfBirth: '2000-01-12 15:33:00',
        phone: '(19)995448895',
        email: 'c01@email.com',
        address: '127 Rua xyz',
        location: 'SP Campinas',
        password: '654321',
      },
    ],
  },
};

const store = mockStore({
  candidates: dataStore,
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockUserParams = (id) => {
  jest.mock('react-router-dom', (id) => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id,
    }),
  }));
};

const renderProfile = (id) => {
  mockUserParams(id);
  const { getByTestId } = render(
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <MemoryRouter initialEntries={[`/candidates/profile/${id}`]}>
          <Route path="/candidates/profile/:id">
            <Profile />
          </Route>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

  return { getByTestId };
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Profile page', () => {
  it('should be able to simple render Not found candidate', () => {
    const { getByTestId } = renderProfile('notfound-id');
    const notFound = getByTestId('candidate-notfound');
    expect(notFound).toBeInTheDocument();
  });

  it('should be able to simple render with a found candidate in all list', () => {
    const { getByTestId } = renderProfile(idAll);
    expect(getByTestId('data-container')).toBeInTheDocument();
    expect(getByTestId('user-icon')).toBeInTheDocument();
    expect(getByTestId('mail-icon')).toBeInTheDocument();
    expect(getByTestId('calendar-icon')).toBeInTheDocument();
    expect(getByTestId('location-icon')).toBeInTheDocument();
    expect(getByTestId('phone-icon')).toBeInTheDocument();
    expect(getByTestId('key-icon')).toBeInTheDocument();
  });

  it('should be able to simple render with a found candidate in attended list', () => {
    const { getByTestId } = renderProfile(idAttendend);
    expect(getByTestId('data-container')).toBeInTheDocument();
    expect(getByTestId('user-icon')).toBeInTheDocument();
    expect(getByTestId('mail-icon')).toBeInTheDocument();
    expect(getByTestId('calendar-icon')).toBeInTheDocument();
    expect(getByTestId('location-icon')).toBeInTheDocument();
    expect(getByTestId('phone-icon')).toBeInTheDocument();
    expect(getByTestId('key-icon')).toBeInTheDocument();
  });

  it('should be able to simple render with a found candidate in trash list', () => {
    const { getByTestId } = renderProfile(idTrash);
    expect(getByTestId('data-container')).toBeInTheDocument();
    expect(getByTestId('user-icon')).toBeInTheDocument();
    expect(getByTestId('mail-icon')).toBeInTheDocument();
    expect(getByTestId('calendar-icon')).toBeInTheDocument();
    expect(getByTestId('location-icon')).toBeInTheDocument();
    expect(getByTestId('phone-icon')).toBeInTheDocument();
    expect(getByTestId('key-icon')).toBeInTheDocument();
  });

  it('should be able to show user information when user icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const userIcon = getByTestId('user-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(userIcon);
    expect(label.innerHTML).toEqual('Hi, my name is');
    expect(value.innerHTML).toEqual(`${dataStore.all.data[0].name} ${dataStore.all.data[0].lastName}`);
  });

  it('should be able to show user information when user icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const userIcon = getByTestId('user-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(userIcon);
    });
    expect(label.innerHTML).toEqual('Hi, my name is');
    expect(value.innerHTML).toEqual(`${dataStore.all.data[0].name} ${dataStore.all.data[0].lastName}`);

    act(() => {
      fireEvent.mouseLeave(userIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });

  it('should be able to show user information when e-mail icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const mailIcon = getByTestId('mail-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(mailIcon);
    expect(label.innerHTML).toEqual('My e-mail is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].email);
  });

  it('should be able to show user information when e-mail icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const mailIcon = getByTestId('mail-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(mailIcon);
    });
    expect(label.innerHTML).toEqual('My e-mail is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].email);

    act(() => {
      fireEvent.mouseLeave(mailIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });

  it('should be able to show user information when calendar icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const calendarIcon = getByTestId('calendar-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(calendarIcon);
    expect(label.innerHTML).toEqual('My birthday is');
    expect(value.innerHTML).toEqual(
      new Date(dataStore.all.data[0].dateOfBirth).toLocaleDateString(),
    );
  });

  it('should be able to show user information when calendar icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const mailIcon = getByTestId('calendar-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(mailIcon);
    });
    expect(label.innerHTML).toEqual('My birthday is');
    expect(value.innerHTML).toEqual(
      new Date(dataStore.all.data[0].dateOfBirth).toLocaleDateString(),
    );

    act(() => {
      fireEvent.mouseLeave(mailIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });

  it('should be able to show user information when location icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const locationIcon = getByTestId('location-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(locationIcon);
    expect(label.innerHTML).toEqual('My address is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].address);
  });

  it('should be able to show user information when location icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const locationIcon = getByTestId('location-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(locationIcon);
    });
    expect(label.innerHTML).toEqual('My address is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].address);

    act(() => {
      fireEvent.mouseLeave(locationIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });

  it('should be able to show user information when phone icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const phoneIcon = getByTestId('phone-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(phoneIcon);
    expect(label.innerHTML).toEqual('My phone is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].phone);
  });

  it('should be able to show user information when phone icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const phoneIcon = getByTestId('phone-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(phoneIcon);
    });
    expect(label.innerHTML).toEqual('My phone is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].phone);

    act(() => {
      fireEvent.mouseLeave(phoneIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });

  it('should be able to show user information when key icon is clicked', () => {
    const { getByTestId } = renderProfile(idAll);
    const keyIcon = getByTestId('key-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    fireEvent.click(keyIcon);
    expect(label.innerHTML).toEqual('My password is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].password);
  });

  it('should be able to show user information when key icon is hovered', () => {
    const { getByTestId } = renderProfile(idAll);
    const keyIcon = getByTestId('key-icon');
    const label = getByTestId('info-label');
    const value = getByTestId('info-value');

    act(() => {
      fireEvent.mouseEnter(keyIcon);
    });
    expect(label.innerHTML).toEqual('My password is');
    expect(value.innerHTML).toEqual(dataStore.all.data[0].password);

    act(() => {
      fireEvent.mouseLeave(keyIcon);
    });
    expect(label.innerHTML).toEqual('');
    expect(value.innerHTML).toEqual('');
  });
});
