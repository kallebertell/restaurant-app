
import ensureAuthToken from '../ensureAuthToken';

it('returns token when its already loaded', () => {
  const token = '123_xyz_token';
  const tokenIsLoading = false;

  const gen = ensureAuthToken()
  // select token
  gen.next();
  // select token is loading
  gen.next(token);
  // select token
  gen.next(tokenIsLoading);

  expect(gen.next().done).toBe(true);
});

it('requests token when its not loaded', () => {
  const token = undefined;
  const tokenIsLoading = false;
  const response = {
    data: {
      token: '123_new_token'
    }
  };
  const gen = ensureAuthToken()
  // select token
  gen.next();
  // select token is loading
  gen.next(token);
  // put fetchAuthRequest
  gen.next(tokenIsLoading);
  // call fetchAuth
  gen.next()
  // put fetchAuthsuccess
  const { PUT: { action: successAction } } = gen.next(response).value;
  // select auth token
  gen.next();

  expect(successAction.data).toBe(response.data.token);
  expect(gen.next().done).toBe(true);
});
