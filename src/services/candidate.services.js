import randomUserGeneratorApi from '../api/randomUserGeneratorApi';

const getCandidates = async ({ page = 1, results = 10 }) => {
  const result = await randomUserGeneratorApi.get(`&seed=candidates&page=${page}&results=${results}`);

  const { info, results: candidates } = result.data;
  const { page: currentPage } = info;

  return {
    currentPage,
    data: candidates.map((candidate) => {
      const {
        login, picture, phone, location, email, dob,
      } = candidate;
      const { uuid: _id, password } = login;
      const { medium, large } = picture;
      const { first: name, last: lastName } = candidate.name;
      const { city, state, street } = location;
      const { date: dateOfBirth } = dob;

      return {
        _id,
        picture: medium,
        largePicture: large,
        name,
        lastName,
        dateOfBirth,
        phone,
        email,
        address: `${street.number} ${street.name}`,
        location: `${city} - ${state}`,
        password,
      };
    }),
  };
};

export { getCandidates };
