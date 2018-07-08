import * as React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { RESTAURANT_LISTING_PATH } from '../routePaths';

const WelcomeMessage = styled.h1`
  text-align: center;
  font-size: 3rem;
`

const OFFICE_RESTAURANTS_PATH =
  RESTAURANT_LISTING_PATH
    .replace(':city', 'Berlin')
    .replace(':postCode', '10117');

export default class PageHome extends React.Component {
  public render() {
    return (
      <section>
        <WelcomeMessage>Welcome to pizza</WelcomeMessage>
        <Link to={OFFICE_RESTAURANTS_PATH}>Find a restaurant</Link>
      </section>
    );
  }
}
