import * as React from 'react';

import { shallow } from 'enzyme';

import { App } from './App';

const fetchAuthRequest = () => ({ type: 'action' });

it('renders without crashing', () => {
  const wrapper = shallow(<App fetchAuthRequest={fetchAuthRequest}/>);
  expect(wrapper).toMatchSnapshot();
});
