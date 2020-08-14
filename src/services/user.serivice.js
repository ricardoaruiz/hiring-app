import randomUserGeneratorApi from '../api/randomUserGeneratorApi';

const getLoggedUser = async () => {
  const response = await randomUserGeneratorApi.get('&seed=user&gender=female');

  const { results } = response.data;
  const { picture } = results[0];

  return {
    image: picture.thumbnail,
  };
};

export { getLoggedUser };
