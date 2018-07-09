import * as React from 'react';

import { shallow } from 'enzyme';

import RestaurantCard from '../RestaurantCard';

it('renders', () => {
  const wrapper = shallow(
  <RestaurantCard
    name="food place"
    logoUri="http://placehold.it/200/200"
    rating={4.2}
    categories={['doner','pizza']}
    address={{
      street_name: 'street',
      street_number: '1',
      zipcode: '10000',
      city: 'Berlin'
    }}
    />
);
  expect(wrapper).toMatchSnapshot();
});
