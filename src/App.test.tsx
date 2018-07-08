import * as React from 'react';

import { shallow } from 'enzyme';

import { App } from 'App';

const fetchAuthRequest = () => ({ type: 'action' });
const location = { pathname: '/', search: '', state: '', hash: '' };

it('renders without crashing', () => {
  const wrapper = shallow(<App fetchAuthRequest={fetchAuthRequest} location={location}/>);
  expect(wrapper).toMatchSnapshot();
});
